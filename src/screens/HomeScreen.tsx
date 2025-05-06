import React from 'react';
import { ScrollView, View, StyleSheet, Button, Text, TouchableOpacity } from 'react-native';
import UserRemainingMacros from '../components/UserRemainingMacros';
import GymMap from '../components/GymMap';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeNavProp>();
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <UserRemainingMacros />
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.squareButton}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('ChatList')}
                >
                    <Text style={styles.buttonTitle}>💬 Chats</Text>
                    <Text style={styles.buttonDesc}>
                        Communicate with other users
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.squareButton}
                    activeOpacity={0.7}
                // onPress={() => navigation.navigate('Settings')}
                >
                    <Text style={styles.buttonTitle}>📃 Blog</Text>
                    <Text style={styles.buttonDesc}>
                        See new meal recepies and training advice
                    </Text>
                </TouchableOpacity>
            </View>
            <GymMap />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
    }, buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    squareButton: {
        width: '48%',
        aspectRatio: 1,
        backgroundColor: '#007AFF',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    buttonTitle: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '700',
        position: 'absolute',
        top: 12,
        left: 12,
    },
    buttonDesc: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'left',
        width: '80%',
        marginTop: '10%',
    },
});
