import React, { useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import SettingsButton from './SettingsButton';
import { UserContext } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const BACKEND_URL = 'http://localhost:3000';

export default function Header() {
    const { user, setUser } = useContext(UserContext);

    const fetchUserPhoto = async () => {
        try {
            const token = await AsyncStorage.getItem('auth-token');
            if (!token) return;

            const res = await fetch(`${BACKEND_URL}/getProfile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': token,
                },
            });
            if (!res.ok) {
                const { message } = await res.json();
                throw new Error(message || 'Failed to fetch profile');
            }
            const data = await res.json();
            setUser({
                username: data.username,
                photoUri: data.photoUri ?? null,
            });
        } catch (err: any) {
            console.error('Error fetching header profile:', err);
            Alert.alert('Error', err.message);
        }
    };

    // Re-fetch photoUri every time the header gains focus.
    useFocusEffect(
        useCallback(() => {
            fetchUserPhoto();
        }, [])
    );

    return (
        <View style={styles.header}>
            <View style={styles.photoContainer}>
                {user && user.photoUri ? (
                    <Image source={{ uri: user.photoUri }} style={styles.photo} />
                ) : (
                    <Text style={styles.photoPlaceholder}>Add Photo</Text>
                )}
            </View>
            <Text style={styles.headerText}>MyFitnessApp</Text>
            <SettingsButton />
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#007AFF',
        paddingHorizontal: 25,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white'
    },
    photoContainer: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },
    photo: {
        width: 40,
        height: 40,
    },
    photoPlaceholder: {
        fontSize: 10,
        color: '#aaa',
        textAlign: 'center',
    },
});
