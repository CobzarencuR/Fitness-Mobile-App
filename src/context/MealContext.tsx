import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Food = {
    id: number;
    category: string;
    foodname: string;
    grams: number;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
};

export type Meal = {
    id: number;
    userId: number;
    title: string;
    date: string;
    foods: Food[];
};

type MealContextType = {
    meals: Meal[];
    loadMeals: (selectedDate?: string) => Promise<void>;
    addMeal: (date?: string) => Promise<void>;
    addFoodToMeal: (mealId: number, food: Food) => Promise<void>;
    updateFoodInMeal: (mealId: number, updatedFood: Food) => Promise<void>;
    deleteMeal: (mealId: number) => Promise<void>;
    removeFoodFromMeal: (mealId: number, foodId: number) => Promise<void>;
    moveFoodToMeal: (sourceMealId: number, destinationMealId: number, food: Food) => Promise<void>;
};

export const MealContext = createContext<MealContextType>({
    meals: [],
    loadMeals: async () => { },
    addMeal: async () => { },
    addFoodToMeal: async () => { },
    updateFoodInMeal: async () => { },
    deleteMeal: async () => { },
    removeFoodFromMeal: async () => { },
    moveFoodToMeal: async () => { },
});

type Props = { children: ReactNode };

export const MealProvider = ({ children }: Props) => {
    const [meals, setMeals] = useState<Meal[]>([]);
    const BACKEND = 'http://localhost:3000';

    const loadMeals = async (selectedDate?: string) => {
        const storedUsername = await AsyncStorage.getItem('loggedInUsername');
        if (!storedUsername) {
            setMeals([]);
            return;
        }
        const dateToLoad = selectedDate || new Date().toISOString().split('T')[0];

        try {
            const res = await fetch(
                `${BACKEND}/getUserMeals?username=${encodeURIComponent(storedUsername)}&date=${dateToLoad}`
            );
            if (!res.ok) throw new Error('Failed to fetch meals');
            const data = await res.json();
            const transformed = data.map((m: any) => ({
                id: m.mealid,
                userId: m.user_id,
                title: m.name,
                date: m.date,
                foods: m.foods.map((f: any) => ({
                    id: f.foodid,
                    category: f.category,
                    foodname: f.foodname,
                    grams: f.grams,
                    calories: f.calories,
                    protein: f.protein,
                    carbs: f.carbs,
                    fats: f.fats,
                })),
            }));
            setMeals(transformed);
        } catch (error) {
            console.error('Error loading meals:', error);
        }
    };

    // after: server does the naming
    const addMeal = async (date?: string) => {
        const currentDate = date || new Date().toISOString().split('T')[0];
        const username = await AsyncStorage.getItem('loggedInUsername');

        try {
            const res = await fetch(`${BACKEND}/addMeal`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, date: currentDate }),
            });

            const text = await res.text();

            if (!res.ok) throw new Error(`Failed to add meal (status ${res.status})`);
            const newMeal = JSON.parse(text);
            setMeals(prev => [
                ...prev,
                {
                    id: newMeal.mealid,
                    userId: newMeal.user_id,
                    title: newMeal.name,    // server computed the right "Meal N"
                    date: newMeal.date,
                    foods: [],
                },
            ]);
        } catch (err) {
            console.error('Error adding meal:', err);
        }
    };


    const deleteMeal = async (mealId: number) => {
        try {
            const res = await fetch(`${BACKEND}/deleteMeal?mealid=${mealId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete meal');
            // now re-load from the server (which has renumbered)
            await loadMeals();
        } catch (error) {
            console.error('Error deleting meal:', error);
        }
    };

    const addFoodToMeal = async (mealId: number, food: Food) => {
        try {
            const res = await fetch(`${BACKEND}/addFood`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mealid: mealId,
                    foodname: food.foodname,
                    grams: food.grams,
                    category: food.category,
                    calories: food.calories,
                    protein: food.protein,
                    carbs: food.carbs,
                    fats: food.fats,
                }),
            });
            if (!res.ok) throw new Error('Failed to add food');
            const added = await res.json();
            setMeals(prev => prev.map(m =>
                m.id === mealId
                    ? { ...m, foods: [...m.foods, { ...food, id: added.foodid }] }
                    : m
            ));
        } catch (error) {
            console.error('Error adding food:', error);
        }
    };

    const updateFoodInMeal = async (mealId: number, updatedFood: Food) => {
        try {
            const res = await fetch(`${BACKEND}/updateFood`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    foodid: updatedFood.id,
                    foodname: updatedFood.foodname,
                    grams: updatedFood.grams,
                    category: updatedFood.category,
                    calories: updatedFood.calories,
                    protein: updatedFood.protein,
                    carbs: updatedFood.carbs,
                    fats: updatedFood.fats,
                }),
            });
            if (!res.ok) throw new Error('Failed to update food');
            await res.json();
            setMeals(prev => prev.map(m =>
                m.id === mealId
                    ? { ...m, foods: m.foods.map(f => f.id === updatedFood.id ? updatedFood : f) }
                    : m
            ));
        } catch (error) {
            console.error('Error updating food:', error);
        }
    };

    const removeFoodFromMeal = async (mealId: number, foodId: number) => {
        try {
            const res = await fetch(`${BACKEND}/deleteFood?foodid=${foodId}`, { method: 'DELETE' });
            if (!res.ok) throw new Error('Failed to delete food');
            setMeals(prev => prev.map(m =>
                m.id === mealId
                    ? { ...m, foods: m.foods.filter(f => f.id !== foodId) }
                    : m
            ));
        } catch (error) {
            console.error('Error deleting food:', error);
        }
    };

    const moveFoodToMeal = async (sourceMealId: number, destinationMealId: number, food: Food) => {
        try {
            const res = await fetch(`${BACKEND}/moveFood`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ foodid: food.id, destinationMealId }),
            });
            if (!res.ok) throw new Error('Failed to move food');
            await res.json();
            setMeals(prev => prev.map(m => {
                if (m.id === sourceMealId) {
                    return { ...m, foods: m.foods.filter(f => f.id !== food.id) };
                }
                if (m.id === destinationMealId) {
                    return { ...m, foods: [...m.foods, food] };
                }
                return m;
            }));
        } catch (error) {
            console.error('Error moving food:', error);
        }
    };

    useEffect(() => {
        loadMeals();
    }, []);

    return (
        <MealContext.Provider
            value={{
                meals,
                loadMeals,
                addMeal,
                addFoodToMeal,
                updateFoodInMeal,
                deleteMeal,
                removeFoodFromMeal,
                moveFoodToMeal,
            }}
        >
            {children}
        </MealContext.Provider>
    );
};
