import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MealContext, Food } from '../context/MealContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalization } from '../context/LocalizationContext';

type RouteParams = { mealId: number; food: Food };

const FoodDetailScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { mealId, food } = route.params as RouteParams;
    const { meals, addFoodToMeal, updateFoodInMeal } = useContext(MealContext);
    const [grams, setGrams] = useState(food.grams.toString());
    const { t, td } = useLocalization();

    const fetchTargetCalories = async (): Promise<number> => {
        const token = await AsyncStorage.getItem('auth-token');
        if (!token) return 0;
        try {
            const res = await fetch('http://10.0.2.2:3000/getProfile', {
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
            Alert.alert(t('Invalid input'), t('Please enter a valid number for grams.'));
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
                t('Not enough calories'),
                t('remaining_calories_message', { remaining })
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
            <Text style={styles.header}>{t('Food Details')}</Text>
            <View style={styles.content}>
                <Text style={styles.label}>{t('Name')}: {td(food, 'foodname')}</Text>
                <View style={styles.row}>
                    <Text style={styles.inlineLabel}>{t('Grams')}:</Text>
                    <TextInput
                        style={styles.inlineInput}
                        value={grams}
                        onChangeText={setGrams}
                        keyboardType="numeric"
                    />
                    <Text style={styles.unit}> g</Text>
                </View>
                <Text style={styles.details}>
                    {t('Calories')}: {Math.round(food.calories * (parseFloat(grams) / food.grams))} kcal
                </Text>
                <Text style={styles.details}>
                    {t('Protein')}: {(food.protein * (parseFloat(grams) / food.grams)).toFixed(1)}g | {t('Carbs')}:{' '}
                    {(food.carbs * (parseFloat(grams) / food.grams)).toFixed(1)}g | {t('Fats')}:{' '}
                    {(food.fats * (parseFloat(grams) / food.grams)).toFixed(1)}g
                </Text>
            </View>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>{t('Save')}</Text>
            </TouchableOpacity>
        </View >
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: 'space-between' },
    header: { fontSize: 20, fontWeight: 'bold', marginTop: 40, marginBottom: 32, textAlign: 'center' },
    content: {
        flex: 1
    },
    label: { fontSize: 16, marginBottom: 8 },
    row: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 24,
    },
    inlineLabel: {
        fontSize: 16,
        marginRight: 2,
    },
    inlineInput: {
        minWidth: 15,
        fontSize: 16,
        padding: 0,
        margin: 0,
        borderWidth: 0,
        textAlign: 'right',
    },
    unit: {
        fontSize: 16,
    },
    details: { fontSize: 16, marginBottom: 8, textAlign: 'center' },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    saveButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});

export default FoodDetailScreen;
