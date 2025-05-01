import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MealContext, Food } from '../context/MealContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RouteParams = { mealId: number; food: Food };

const FoodDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { mealId, food } = route.params as RouteParams;
    const { meals, addFoodToMeal, updateFoodInMeal } = useContext(MealContext);

    const [grams, setGrams] = useState(food.grams.toString());

    const fetchTargetCalories = async (): Promise<number> => {
        const token = await AsyncStorage.getItem('auth-token');
        if (!token) return 0;
        try {
            const res = await fetch('http://localhost:3000/getProfile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            if (!res.ok) return 0;
            const data = await res.json();
            return data.calories ?? 0;
        } catch (err) {
            console.warn('Error fetching target calories:', err);
            return 0;
        }
    };

    const computeConsumedCalories = (): number => {
        return meals.reduce((sum, m) => sum + m.foods.reduce((subT, f) => subT + f.calories, 0), 0);
    };

    const handleSave = async () => {
        const newGrams = parseFloat(grams);
        if (isNaN(newGrams) || newGrams <= 0) {
            Alert.alert('Invalid input', 'Please enter a valid number for grams.');
            return;
        }

        const factor = newGrams / food.grams;
        const updatedFood: Food = {
            ...food,
            grams: newGrams,
            calories: Math.round(food.calories * factor),
            protein: parseFloat((food.protein * factor).toFixed(1)),
            carbs: parseFloat((food.carbs * factor).toFixed(1)),
            fats: parseFloat((food.fats * factor).toFixed(1)),
            id: food.id,
        };

        // Calculate remaining calories
        const targetCalories = await fetchTargetCalories();
        const consumedTotal = computeConsumedCalories();
        // Determine calorie difference: update vs add
        const existsInMeal = meals.some((m) =>
            m.id === mealId && m.foods.some((f) => f.id === food.id)
        );
        const diff = existsInMeal
            ? updatedFood.calories - food.calories
            : updatedFood.calories;
        const newTotal = consumedTotal + diff;

        if (newTotal > targetCalories) {
            const remaining = targetCalories - consumedTotal;
            Alert.alert(
                'Not enough calories',
                `You only have ${remaining} calories remaining. Remove some foods or reduce grams.`
            );
            return;
        }

        if (existsInMeal) {
            await updateFoodInMeal(mealId, updatedFood);
        } else {
            await addFoodToMeal(mealId, updatedFood);
        }

        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Food Details</Text>
            <Text style={styles.label}>Name: {food.foodname}</Text>
            <Text style={styles.label}>Default grams: {food.grams}g</Text>
            <Text style={styles.label}>Enter new grams:</Text>
            <TextInput
                style={styles.input}
                value={grams}
                onChangeText={setGrams}
                keyboardType="numeric"
            />
            <Text style={styles.details}>
                Calories: {Math.round(food.calories * (parseFloat(grams) / food.grams))} kcal
            </Text>
            <Text style={styles.details}>
                Protein: {(food.protein * (parseFloat(grams) / food.grams)).toFixed(1)}g | Carbs:{' '}
                {(food.carbs * (parseFloat(grams) / food.grams)).toFixed(1)}g | Fats:{' '}
                {(food.fats * (parseFloat(grams) / food.grams)).toFixed(1)}g
            </Text>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'center' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 8 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 12,
    },
    details: { fontSize: 16, marginBottom: 8, textAlign: 'center' },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default FoodDetailScreen;
