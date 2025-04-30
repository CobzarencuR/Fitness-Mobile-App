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

    const caloriesPercent = calcPercentage(consumed.calories, targetMacros.calories);
    const proteinPercent = calcPercentage(consumed.protein, targetMacros.protein);
    const carbsPercent = calcPercentage(consumed.carbs, targetMacros.carbs);
    const fatsPercent = calcPercentage(consumed.fats, targetMacros.fats);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Remaining Calories</Text>

            <View style={styles.macroRow}>
                <Text style={styles.label}>
                    Calories: {consumed.calories} / {targetMacros.calories} kcal
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${caloriesPercent}%` }]} />
                </View>
            </View>

            <View style={styles.macroRow}>
                <Text style={styles.label}>
                    Protein: {consumed.protein.toFixed(1)} / {targetMacros.protein} g
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${proteinPercent}%` }]} />
                </View>
            </View>

            <View style={styles.macroRow}>
                <Text style={styles.label}>
                    Carbs: {consumed.carbs.toFixed(1)} / {targetMacros.carbs} g
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${carbsPercent}%` }]} />
                </View>
            </View>

            <View style={styles.macroRow}>
                <Text style={styles.label}>
                    Fats: {consumed.fats.toFixed(1)} / {targetMacros.fats} g
                </Text>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${fatsPercent}%` }]} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { padding: 20, backgroundColor: '#fff', alignItems: 'center' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    macroRow: {
        width: '100%',
        marginVertical: 8,
    },
    label: { fontSize: 18, marginBottom: 4 },
    progressBar: {
        width: '100%',
        height: 10,
        backgroundColor: '#ccc',
        borderRadius: 5,
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#28a745',
        borderRadius: 5,
    },
    errorText: { fontSize: 18, color: 'red' },
});

export default UserRemainingMacros;
