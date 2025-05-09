import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Image, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { UserContext } from '../context/UserContext';
import Slider from '@react-native-community/slider';
import { useLocalization } from '../context/LocalizationContext';

export default function ProfileScreen() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [photoUri, setPhotoUri] = useState<string | null>(null);
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [sex, setSex] = useState('');
    const [dob, setDob] = useState(new Date());
    const [initialDob, setInitialDob] = useState<Date | null>(null);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [activityLevel, setActivityLevel] = useState('');
    const [objective, setObjective] = useState('');
    const [experience, setExperience] = useState('');
    const [trainingDays, setTrainingDays] = useState<number>(2);
    const navigation = useNavigation();
    const { setUser } = useContext(UserContext);
    const [profileLoaded, setProfileLoaded] = useState(false);
    const { t } = useLocalization();

    // Calculate age based on DOB
    const calculateAge = (dob: Date) => {
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        if (month < dob.getMonth() || (month === dob.getMonth() && day < dob.getDate())) {
            age--;
        }
        return age;
    };

    const sexOptions = [
        { label: t('Male'), value: 'M' },
        { label: t('Female'), value: 'F' }
    ];

    const ActivityLevelOptions = [
        { label: t('Not Very Active'), value: '1.1' },
        { label: t('Light Active'), value: '1.2' },
        { label: t('Active'), value: '1.3' },
        { label: t('Very Active'), value: '1.4' }
    ];

    const ObjectiveOptions = [
        { label: t('Fat Loss'), value: 'lose' },
        { label: t('Maintenance'), value: 'maintain' },
        { label: t('Muscle Gain'), value: 'gain' }
    ]

    const ExperienceOptions = [
        { label: t('Beginner'), value: 'beginner' },
        { label: t('Intermediate'), value: 'intermediate' },
        { label: t('Advanced'), value: 'advanced' }
    ]

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = await AsyncStorage.getItem('auth-token');
            if (!token) {
                Alert.alert(t('Error'), t('No auth token found. Please log in again'));
                return;
            }

            try {
                const response = await fetch('http://10.0.2.2:3000/getProfile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': token,
                    },
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message || 'Failed to load profile');
                }

                // populate all fields exactly as before:
                setUsername(data.username);
                setEmail(data.email);
                setPhotoUri(data.photoUri);
                setHeight(data.height ? data.height.toString() : '');
                setWeight(data.weight ? data.weight.toString() : '');
                setSex(data.sex || '');
                setDob(data.dob ? new Date(data.dob) : new Date());
                setInitialDob(data.dob ? new Date(data.dob) : new Date());
                setActivityLevel(data.activityLevel ? data.activityLevel.toString() : '');
                setObjective(data.objective || '');
                setExperience(prev => {
                    return data.experience !== prev ? data.experience : prev;
                });
                setTrainingDays(prev => {
                    const dbDays = data.trainingDays || 2;
                    return dbDays !== prev ? dbDays : prev;
                });
                // update global context
                setUser({ username: data.username, photoUri: data.photoUri });
                setProfileLoaded(true);
            } catch (err: any) {
                console.error('Error fetching profile:', err);
                Alert.alert(t('Error'), err.message);
            } finally {
                // setProfileLoaded(true);
            }
        };

        fetchUserProfile();
    }, []);

    const calculateCaloriesAndMacros = () => {
        const weightKg = parseFloat(weight);
        const heightCm = parseFloat(height);
        const age = calculateAge(dob);
        const activityMultiplier = parseFloat(activityLevel);

        let BMR;
        if (sex === 'M') {
            BMR = 66 + 13.7 * weightKg + 5 * heightCm - 6.75 * age;
        } else if (sex === 'F') {
            BMR = 655 + 9.6 * weightKg + 1.7 * heightCm - 4.7 * age;
        } else {
            return null;
        }

        let totalCalories = BMR * activityMultiplier;

        const proteinGrams = weightKg * 1.75;
        const fatGrams = weightKg * 0.88;
        const proteinCalories = proteinGrams * 4;
        const fatCalories = fatGrams * 9;
        let carbsCalories = 0;
        let carbsGrams = 0;

        if (objective === 'maintain') {
            carbsCalories = totalCalories - (proteinCalories + fatCalories);
            carbsGrams = carbsCalories / 4;
        } else if (objective === 'lose') {
            totalCalories -= 300;
            carbsCalories = totalCalories - (proteinCalories + fatCalories);
            carbsGrams = carbsCalories / 4;
        } else if (objective === 'gain') {
            totalCalories += 150;
            carbsCalories = totalCalories - (proteinCalories + fatCalories);
            carbsGrams = carbsCalories / 4;
        }

        return {
            totalCalories: Math.round(totalCalories),
            protein: Math.round(proteinGrams),
            carbs: Math.round(carbsGrams),
            fat: Math.round(fatGrams),
        };
    };

    const handleChoosePhoto = () => {
        const options: ImageLibraryOptions = {
            mediaType: 'photo',
            quality: 0.8,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else {
                if (response.assets && response.assets.length > 0) {
                    const asset = response.assets[0];
                    setPhotoUri(asset.uri || null);
                }
            }
        });
    };

    // Function to update user profile
    const updateProfile = async () => {
        if (!height || !weight || !sex || !dob || !activityLevel || !objective || !experience || !trainingDays || !photoUri) {
            Alert.alert(t('Error'), t('All fields must be filled in before saving'));
            return;
        }

        // Create date objects for today and for the selected dob (set hours to 0 to compare dates only)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDob = new Date(dob);
        selectedDob.setHours(0, 0, 0, 0);

        // Calculate the difference in milliseconds and compare to one year (approx. 365 days)
        const diffMillis = today.getTime() - selectedDob.getTime();
        const oneYearMillis = 365 * 24 * 60 * 60 * 1000; // approximate one year in milliseconds

        if (diffMillis < oneYearMillis) {
            Alert.alert(t('Error'), t('Date of birth must be at least one year before today'));
            return;
        }

        const age = calculateAge(dob);
        const macros = calculateCaloriesAndMacros();

        if (!macros) return;


        try {
            const response = await fetch('http://10.0.2.2:3000/updateProfile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    height,
                    weight,
                    sex,
                    dob: dob.toISOString().split('T')[0],
                    age,
                    activityLevel,
                    objective,
                    experience,
                    trainingDays,
                    calories: macros.totalCalories,
                    protein: macros.protein,
                    carbs: macros.carbs,
                    fats: macros.fat,
                    photoUri,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setUser({ username, photoUri });
                Alert.alert(t('Success'), t('Profile updated successfully'));
            } else {
                console.log('Error updating profile in PostgreSQL:', data.message);
            }
        } catch (error) {
            console.error('Error connecting to the server:', error);
            Alert.alert(t('Error'), t('Failed to update profile'));
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header}>{t('Profile')}</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Photo')}:</Text>
                    <TouchableOpacity style={styles.photoContainer} onPress={handleChoosePhoto}>
                        {photoUri ? (
                            <Image source={{ uri: photoUri }} style={styles.photo} />
                        ) : (
                            <Text style={styles.photoPlaceholder}>{t('Add Photo')}</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Username')}:</Text>
                    <Text style={styles.value}>{username}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Email')}:</Text>
                    <Text style={styles.value}>{email}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Height')} (cm):</Text>
                    <View style={styles.value}>
                        <TextInput placeholder="Insert height" value={height} onChangeText={(text) => setHeight(text.replace(',', '.'))} keyboardType="numeric" />
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Weight')} (kg):</Text>
                    <View style={styles.value}>
                        <TextInput placeholder="Insert weight" value={weight} onChangeText={(text) => setWeight(text.replace(',', '.'))} keyboardType="numeric" />
                    </View>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Sex:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={sexOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select sex"
                        value={sex}
                        onChange={item => setSex(item.value)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Date of Birth')}:</Text>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setShowDatePicker(true)}>
                        <Text>{dob.toDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={dob}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) setDob(selectedDate);
                            }}
                        />
                    )}
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Activity Level')}:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={ActivityLevelOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select level"
                        value={activityLevel}
                        onChange={item => setActivityLevel(item.value)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Objective')}:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={ObjectiveOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select objective"
                        value={objective}
                        onChange={item => setObjective(item.value)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Experience')}:</Text>
                    <Dropdown
                        style={styles.dropdown}
                        data={ExperienceOptions}
                        labelField="label"
                        valueField="value"
                        placeholder="Select experience"
                        value={experience}
                        onChange={item => setExperience(item.value)}
                    />
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>{t('Training Days')}: {trainingDays}</Text>
                    {profileLoaded && (
                        <Slider
                            style={styles.slider}
                            minimumValue={2}
                            maximumValue={experience === 'beginner' ? 4 : experience === 'intermediate' ? 6 : 7}
                            step={1}
                            value={trainingDays}
                            onValueChange={(v) => setTrainingDays(v)}
                            minimumTrackTintColor="#007BFF"
                            maximumTrackTintColor="#ccc"
                        />
                    )}
                </View>

                <TouchableOpacity style={styles.savebutton} onPress={updateProfile}>
                    <Text style={styles.buttonText}>{t('Save Profile')}</Text>
                </TouchableOpacity>
            </View >
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, paddingVertical: 10, backgroundColor: '#fff' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15, textAlign: 'center' },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ccc', height: 50, marginHorizontal: 15 },
    label: { fontSize: 18, marginLeft: 15 },
    value: { fontSize: 16, color: '#333', marginRight: 15 },
    dropdownButton: { borderWidth: 1, borderRadius: 5, borderColor: '#ccc', width: 'auto' },
    dropdown: { backgroundColor: '#fff', borderColor: '#ccc', borderRadius: 5, width: 100, marginRight: 15 },
    savebutton: { width: '30%', alignSelf: 'center', backgroundColor: '#007BFF', padding: 10, borderRadius: 5, alignItems: 'center', marginTop: 25 },
    buttonText: { color: 'white', fontWeight: 'bold' },
    photoContainer: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        marginBottom: 10
    },
    photo: {
        width: 50,
        height: 50,
    },
    photoPlaceholder: {
        fontSize: 12,
        color: '#aaa',
        textAlign: 'center',
    },
    slider: {
        width: '50%',
        height: 40,
    },
});