import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import UserRemainingMacros from '../components/UserRemainingMacros';
import GymMap from '../components/GymMap';

export default function HomeScreen() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <UserRemainingMacros />
            <GymMap />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
});
