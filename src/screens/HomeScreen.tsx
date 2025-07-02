import React from 'react';
import { ScrollView, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import UserRemainingMacros from '../components/UserRemainingMacros';
import GymMap from '../components/GymMap';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLocalization } from '../context/LocalizationContext';
import WeightGraph from '../components/WeightGraph';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Main'>;

export default function HomeScreen() {
    const navigation = useNavigation<HomeNavProp>();
    const { t } = useLocalization();

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <UserRemainingMacros />
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.squareButton}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('ChatList')}
                >
                    <Text style={styles.buttonTitle}>💬 {t('Chats')}</Text>
                    <Text style={styles.buttonDesc}>
                        {t("Communicate with other users")}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.squareButton}
                    activeOpacity={0.7}
                    onPress={() => navigation.navigate('GuideScreen')}
                >
                    <Text style={styles.buttonTitle}>📃 {t('App Guide')}</Text>
                    <Text style={styles.buttonDesc}>
                        {t('Read this guide to understand how to use the app')}
                    </Text>
                </TouchableOpacity>
            </View>
            <WeightGraph />
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
