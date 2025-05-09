import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalization } from "../context/LocalizationContext";

type LanguageNavProp = NativeStackNavigationProp<RootStackParamList, 'Language'>;

export default function LanguageScreen() {
    const nav = useNavigation<LanguageNavProp>();
    const { t, locale, setLocale } = useLocalization();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('Language')}</Text>
            <Text style={styles.subtitle}>{t('Select language')}</Text>

            <TouchableOpacity
                style={styles.listItem}
                onPress={() => setLocale('en')}
                disabled={locale === 'en'}
            >
                <Text style={styles.label}>{t('English')}</Text>
                <View style={[styles.radioOuter, locale === 'en' && styles.radioSelected]}>
                    {locale === 'en' && <View style={styles.radioInner} />}
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.listItem}
                onPress={() => setLocale('ro')}
                disabled={locale === 'ro'}
            >
                <Text style={styles.label}>{t('Română')}</Text>
                <View style={[styles.radioOuter, locale === 'ro' && styles.radioSelected]}>
                    {locale === 'ro' && <View style={styles.radioInner} />}
                </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
    },
    listItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: '#ccc',
    },
    label: {
        fontSize: 18,
        color: '#333',
    },
    radioOuter: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#888',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#007AFF',
    },
    radioSelected: {
        borderColor: '#007AFF',
    },
});
