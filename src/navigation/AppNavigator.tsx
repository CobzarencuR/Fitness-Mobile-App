import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MealScreen from '../screens/MealScreen';
import WorkoutsScreen from '../screens/WorkoutScreen';
import LoginScreen from '../screens/LoginScreen';
import Register from '../screens/Register';
import SettingsScreen from '../screens/SettingsScreen';
import MealCategoryScreen from '../screens/MealCategoryScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import Header from '../components/Header';
import { MealProvider } from '../context/MealContext';
import { UserProvider } from '../context/UserContext';
import { WorkoutProvider } from '../context/WorkoutContext';
import ChatListScreen from '../screens/ChatListScreen';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import { ChatProvider } from '../context/ChatContext';
import LanguageScreen from '../screens/LanguageScreen';

import { LocalizationProvider, useLocalization } from '../context/LocalizationContext';

export type RootStackParamList = {
    Login: undefined;
    Main: undefined;
    Register: undefined;
    Settings: undefined;
    Profile: undefined;
    MealCategory: { mealId: number };
    FoodDetail: { mealId: number; food: any };
    ChatList: undefined;
    ChatRoom: { roomId: number; roomName: string };
    Language: undefined;
};

export type RootTabParamList = {
    Home: undefined;
    Meals: undefined;
    Workouts: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>();

const BottomTabs = () => {
    const { t } = useLocalization();

    return (
        <>
            <Header />
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarIcon: () => null,
                    tabBarLabelStyle: {
                        flexDirection: 'row',
                        fontSize: 18,
                        fontWeight: 'bold',
                        textAlign: 'center',
                        position: 'absolute',
                        top: '50%',
                        transform: [{ translateY: -7.5 }],
                    },
                    tabBarStyle: { display: 'flex' },
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t('Home') }} />
                <Tab.Screen name="Meals" component={MealScreen} options={{ tabBarLabel: t('Meals') }} />
                <Tab.Screen name="Workouts" component={WorkoutsScreen} options={{ tabBarLabel: t('Workouts') }} />
                <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: t('Profile') }} />
            </Tab.Navigator>
        </>
    );
};

export default function AppNavigator() {
    return (
        <LocalizationProvider>

            <UserProvider>
                <WorkoutProvider>
                    <MealProvider>
                        <ChatProvider>
                            <NavigationContainer>
                                <Stack.Navigator screenOptions={{ headerShown: false }}>
                                    <Stack.Screen name="Login" component={LoginScreen} />
                                    <Stack.Screen name="Register" component={Register} />
                                    <Stack.Screen name="Main" component={BottomTabs} />
                                    <Stack.Screen name="Settings" component={SettingsScreen} />
                                    <Stack.Screen name="Profile" component={ProfileScreen} />
                                    <Stack.Screen name="MealCategory" component={MealCategoryScreen} />
                                    <Stack.Screen name="FoodDetail" component={FoodDetailScreen} />
                                    <Stack.Screen name="ChatList" component={ChatListScreen} />
                                    <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
                                    <Stack.Screen name="Language" component={LanguageScreen} />
                                </Stack.Navigator>
                            </NavigationContainer>
                        </ChatProvider>
                    </MealProvider>
                </WorkoutProvider>
            </UserProvider>
        </LocalizationProvider>
    );
}
