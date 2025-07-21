import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useLocalization } from '../context/LocalizationContext';

const GuideScreen: React.FC = () => {
    const { t } = useLocalization();

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <Text style={styles.title}>{t('Welcome to MyFitGlyph Guide')}</Text>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('1. Getting Started')}</Text>
                <Text style={styles.sectionText}>
                    {t('• Sign up for a new account or log in with your existing credentials.')}
                    {'\n'}{t('• Upon login, you’ll land on the Home Screen. To personalize your experience, head to the Profile tab next.')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('2. Profile Setup')}</Text>
                <Text style={styles.sectionText}>
                    {t('• In your Profile, enter your personal metrics (height, weight, age, gender).')}
                    {'\n'}{t('• These details help us tailor meal plans, workouts, and track progress.')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('3. Meal Planning')}</Text>
                <Text style={styles.sectionText}>
                    {t('• Go to the Meal tab to view your daily calories and macronutrients.')}
                    {'\n'}{t('• Select a date to plan meals for any day.')}
                    {'\n'}{t('• Add meals (e.g., Breakfast, Lunch) and pick foods from categorized database lists.')}
                    {'\n'}{t('• Drag & drop foods between meals or delete items as needed.')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('4. Workout Plans')}</Text>
                <Text style={styles.sectionText}>
                    {t('• In the Workout tab, view your personalized plan based on your selected training days.')}
                    {'\n'}{t('• Swap exercises with alternatives for the same muscle group.')}
                    {'\n'}{t('• Tap on any exercise to watch a demonstration video.')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('5. Home Overview')}</Text>
                <Text style={styles.sectionText}>
                    {t('• See your current calories just like in Meal Tab.')}
                    {'\n'}{t('• Track weight progress on the interactive chart after each update.')}
                    {'\n'}{t('• Use the map to locate nearby gyms based on your current location.')}
                    {'\n'}{t('• Quick access boxes:')}
                    {'\n'}    {t('– App Guide (this screen)')}
                    {'\n'}    {t('– Chat Rooms (discuss fitness & nutrition topics)')}
                </Text>
            </View>
            <View style={styles.separator} />

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{t('6. Settings')}</Text>
                <Text style={styles.sectionText}>
                    {t('• Switch app language between English and Romanian anytime.')}
                </Text>
            </View>

            <Text style={styles.footer}>{t('Explore and enjoy your fitness journey!')}</Text>
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
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginVertical: 30,
    },
});

export default GuideScreen;
