import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MealContext, Meal } from '../context/MealContext';

type Macros = {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
};

const BACKEND_URL = 'http://localhost:3000';

const UserRemainingMacros = () => {
    const { meals } = useContext(MealContext);
    const [targetMacros, setTargetMacros] = useState<Macros | null>(null);
    const [loading, setLoading] = useState(true);

    // Fetch the target macros (calories, protein, carbs, fats) from SQLite
    const fetchUserTargetMacros = async () => {
        setLoading(true);
        const token = await AsyncStorage.getItem('auth-token');
        if (!token) {
            Alert.alert('Error', 'You must be logged in to load your macros.');
            setLoading(false);
            return;
        }
        try {
            const res = await fetch(`${BACKEND_URL}/getProfile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.message || 'Failed to load profile');
            }
            setTargetMacros({
                calories: data.calories ? parseFloat(data.calories) : 0,
                protein: data.protein ? parseFloat(data.protein) : 0,
                carbs: data.carbs ? parseFloat(data.carbs) : 0,
                fats: data.fats ? parseFloat(data.fats) : 0,
            });
        } catch (error: any) {
            console.error('Error fetching target macros:', error);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    };
    // Refresh target data each time the screen gains focus.
    useFocusEffect(
        useCallback(() => {
            fetchUserTargetMacros();
        }, [])
    );

    // Compute consumed macros from all meals in MealContext
    const computeConsumedMacros = (meals: Meal[]): Macros => {
        return meals.reduce(
            (totals, meal) => {
                meal.foods.forEach((food) => {
                    totals.calories += food.calories;
                    totals.protein += food.protein;
                    totals.carbs += food.carbs;
                    totals.fats += food.fats;
                });
                return totals;
            },
            { calories: 0, protein: 0, carbs: 0, fats: 0 }
        );
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    if (!targetMacros) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Error loading target macros.</Text>
            </View>
        );
    }

    const consumed = computeConsumedMacros(meals);

    // Calculate percentage fill for each macro (capped at 100)
    const calcPercentage = (consumedValue: number, targetValue: number) => {
        if (targetValue === 0) return 0;
        const percent = (consumedValue / targetValue) * 100;
        return percent > 100 ? 100 : percent;
    };

    const percents = {
        calories: calcPercentage(consumed.calories, targetMacros.calories),
        protein: calcPercentage(consumed.protein, targetMacros.protein),
        carbs: calcPercentage(consumed.carbs, targetMacros.carbs),
        fats: calcPercentage(consumed.fats, targetMacros.fats),
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Remaining Calories</Text>

            {/* 4 labels in a row */}
            <View style={styles.row}>
                {(['calories', 'protein', 'carbs', 'fats'] as const).map(key => (
                    <View key={key} style={styles.cell}>
                        <Text style={styles.label}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                        <Text style={styles.value}>
                            {consumed[key].toFixed(key === 'calories' ? 0 : 1)}/{targetMacros[key]}
                        </Text>
                    </View>
                ))}
            </View>

            {/* progress bars */}
            <View style={styles.row}>
                {(['calories', 'protein', 'carbs', 'fats'] as const).map(key => (
                    <View key={key} style={styles.cell}>
                        <View style={styles.bar}>
                            <View style={[styles.fill, { width: `${percents[key]}%` }]} />
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 12, backgroundColor: '#fff' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
    row: { flexDirection: 'row', width: '100%' },
    cell: { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
    label: { fontSize: 14, fontWeight: '600' },
    value: { fontSize: 12, color: '#555', marginTop: 2 },
    bar: {
        width: '100%', height: 8, backgroundColor: '#eee',
        borderRadius: 4, marginTop: 8, overflow: 'hidden',
    },
    fill: { height: '100%', backgroundColor: '#28a745' },
    error: { color: 'red', textAlign: 'center' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    macroRow: {
        width: '100%',
        marginVertical: 8,
    },
    errorText: { fontSize: 18, color: 'red' },
});

export default UserRemainingMacros;
