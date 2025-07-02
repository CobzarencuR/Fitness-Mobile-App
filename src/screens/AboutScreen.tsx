import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';

const AboutScreen: React.FC = () => {
    const { t } = useLocalization();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>{t('About MyFitnessApp')}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('What Is MyFitnessApp?')}</Text>
                <Text style={styles.sectionText}>
                    {t('MyFitnessApp is a comprehensive fitness and nutrition companion designed to help you track your meals, workouts, and overall progress in one place. Whether you\'re aiming to lose weight, build muscle, or maintain a healthier lifestyle, MyFitnessApp adapts to your goals.')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('Our Story')}</Text>
                <Text style={styles.sectionText}>
                    {t('This app began as my bachelor thesis project at university. As a student passionate about health and technology, I wanted to build a tool that combined robust tracking features with an intuitive, mobile-first design. Over months of research, development, and testing, MyFitnessApp evolved into the app you see today.')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('About the Developer')}</Text>
                <Text style={styles.sectionText}>
                    {t('Hi! I\'m Robert Cobzarencu, a computer science student who loves fitness. Through this project, I applied academic concepts in real-world app development, learning React Native, TypeScript, and user-centered design along the way.')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('Looking Ahead')}</Text>
                <Text style={styles.sectionText}>
                    {t('MyFitnessApp is just getting started. Future updates will include social features, personalized coaching insights, and expanded food and exercise databases. Stay tuned and thank you for being part of this journey!')}
                </Text>
            </View>

            <Text style={styles.footer}>{t('Version 1.0. Built with ❤️ by')} [Your Name]</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingVertical: 20,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 16,
    },
    section: {
        marginHorizontal: 12,
        marginVertical: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 6,
    },
    sectionText: {
        fontSize: 16,
        lineHeight: 22,
    },
    separator: {
        height: 1.5,
        backgroundColor: 'black',
        marginVertical: 16,
        marginHorizontal: 12,
    },
    footer: {
        fontSize: 14,
        textAlign: 'center',
        marginVertical: 30,
        color: '#888',
    },
});

export default AboutScreen;
