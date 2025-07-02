import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalization } from '../context/LocalizationContext';

type Props = NativeStackScreenProps<RootStackParamList, 'Settings'>;

export default function SettingsScreen({ navigation }: Props) {
    const { t } = useLocalization();

    const settingsOptions = [
        { name: t("Profile"), screen: "Profile" },
        { name: t("Chat"), screen: "ChatList" },
        { name: t("Language"), screen: "Language" },
        { name: t("App Guide"), screen: "GuideScreen" },
        { name: t("About"), screen: "AboutScreen" },
    ];

    const handleLogout = async () => {
        await AsyncStorage.removeItem('loggedInUsername');
        navigation.navigate('Login' as never);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('Settings')}</Text>
            {settingsOptions.map((option) => (
                <TouchableOpacity
                    key={option.screen}
                    style={styles.option}
                    onPress={() => navigation.navigate(option.screen as any)}
                // onPress={() => navigation.navigate("Main", { screen: option.screen } as never)}
                >
                    <Text style={styles.optionText}>{option.name}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.buttonText}>{t('Logout')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    option: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    optionText: {
        fontSize: 18,
    },
    buttonText: { color: 'white', fontWeight: 'bold' },
    logoutButton: { width: '25%', alignSelf: 'flex-start', backgroundColor: '#FF3B30', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 20, marginLeft: 10, },

});
