import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type WorkoutContextType = {
    height: number | null;
    weight: number | null;
    sex: 'M' | 'F' | null;
    age: number | null;
    objective: 'lose' | 'maintain' | 'gain' | null;
    trainingDays: number | null;
    experience: 'beginner' | 'intermediate' | 'advanced' | null;
    reload: () => void;
};

export const WorkoutContext = createContext<WorkoutContextType>({
    height: null,
    weight: null,
    sex: null,
    age: null,
    objective: null,
    trainingDays: null,
    experience: null,
    reload: () => { },
});

const BACKEND_URL = 'http://localhost:3000';

export const WorkoutProvider = ({ children }: { children: ReactNode }) => {
    const [height, setHeight] = useState<number | null>(null);
    const [weight, setWeight] = useState<number | null>(null);
    const [sex, setSex] = useState<'M' | 'F' | null>(null);
    const [age, setAge] = useState<number | null>(null);
    const [objective, setObjective] = useState<'lose' | 'maintain' | 'gain' | null>(null);
    const [trainingDays, setTrainingDays] = useState<number | null>(null);
    const [experience, setExperience] = useState<'beginner' | 'intermediate' | 'advanced' | null>(null);

    const load = async () => {
        try {
            const token = await AsyncStorage.getItem('auth-token');
            if (!token) {
                console.warn('No auth token, cannot load workout context');
                reset();
                return;
            }
            const res = await fetch(`${BACKEND_URL}/getProfile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await res.json();
            if (!res.ok) {
                console.error('Failed to fetch profile for workout context:', data);
                reset();
                return;
            }
            setHeight(data.height ?? null);
            setWeight(data.weight ?? null);
            setSex(data.sex ?? null);
            setAge(data.age ?? null);
            setObjective(data.objective ?? null);
            setTrainingDays(data.trainingdays ?? data.trainingDays ?? null);
            setExperience(data.experience ?? null);
        } catch (err) {
            console.error('Error loading workout context:', err);
            reset();
        }
    };

    const reset = () => {
        setHeight(null);
        setWeight(null);
        setSex(null);
        setAge(null);
        setObjective(null);
        setTrainingDays(null);
        setExperience(null);
    };

    useEffect(() => {
        load();
    }, []);

    return (
        <WorkoutContext.Provider
            value={{ height, weight, sex, age, objective, trainingDays, experience, reload: load }}
        >
            {children}
        </WorkoutContext.Provider>
    );
};
