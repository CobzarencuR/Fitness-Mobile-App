import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalization } from '../context/LocalizationContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { t } = useLocalization();

    const loginUser = async () => {
        if (username && password) {
            try {
                const response = await fetch('http://10.0.2.2:3000/login', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                });

                const data = await response.json();
                if (!response.ok) {
                    Alert.alert('Error', data.error || 'Invalid username or password');
                } else {
                    // Save JWT + Postgres user id
                    await AsyncStorage.setItem('auth-token', data.token);
                    await AsyncStorage.setItem('loggedInUserId', `${data.userId}`);
                    await AsyncStorage.setItem('loggedInUsername', username);

                    navigation.navigate('Main');
                }
            } catch (error) {
                console.error('Login error:', error);
                Alert.alert('Error', 'Something went wrong');
            }
        } else {
            Alert.alert('Error', 'Please fill in both fields');
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{t('Login')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t("Username")}
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder={t("Password")}
                value={password}
                secureTextEntry
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={loginUser}>
                <Text style={styles.buttonText}>{t('LOGIN')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
                <Text style={styles.buttonText}>{t('REGISTER')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    text: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
    input: { width: '80%', padding: 10, borderWidth: 1, borderRadius: 5, marginBottom: 10, },
    button: { width: '50%', alignSelf: 'center', backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 10 },
    buttonText: { color: 'white', fontWeight: 'bold' },
});
