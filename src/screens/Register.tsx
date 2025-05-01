import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';

export default function Register({ navigation }: any) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const registerUser = async () => {
        if (!username || !email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }
        if (username && email && password) {
            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, email, password }),
                });

                const data = await response.json();
                if (response.ok) {
                    Alert.alert('Registration Successful', 'You can now log in');
                    navigation.navigate('Login');
                } else {
                    const errorMsg = data.error || data.message || 'Could not register user';
                    if (errorMsg.toLowerCase().includes('exists')) {
                        Alert.alert('Error', 'Username already exists. Please choose another one.');
                    } else {
                        Alert.alert('Error', errorMsg);
                    }
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to connect to the server');
                console.log('PostgreSQL registration error:', error);
            }
        } else {
            Alert.alert('Error', 'Please fill in both fields');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={registerUser}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '100%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10 },
    button: { width: '50%', alignSelf: 'center', backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontWeight: 'bold' },
});

