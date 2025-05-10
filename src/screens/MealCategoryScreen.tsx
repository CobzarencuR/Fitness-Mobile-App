import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, TextInput, } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useLocalization } from '../context/LocalizationContext';

type Category = { category: string; category_ro: string }

const MealCategoryScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute();
    const { mealId } = route.params as { mealId: number };
    const [categories, setCategories] = useState<Category[]>([]);
    const [loadingCategories, setLoadingCategories] = useState<boolean>(true);
    const [foodsByCategory, setFoodsByCategory] = useState<{ [key: string]: any[] }>({});
    const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({});
    const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>({});
    const { t, td } = useLocalization();

    useEffect(() => {
        fetch('http://10.0.2.2:3000/getCategories')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // array of strings ["Meat", "Fruit", "Vegetable", "Grain"]
                // setCategories(data);
                const cats = data.map((item: any) =>
                    typeof item === 'string'
                        ? { category: item, category_ro: item }
                        : item
                );
                setCategories(cats);
                setLoadingCategories(false);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
                setLoadingCategories(false);
            });
    }, []);

    // Toggle the dropdown for a category.
    const toggleCategory = (category: string) => {
        if (expandedCategories[category]) {
            setExpandedCategories((prev) => ({ ...prev, [category]: false }));
        } else {
            setExpandedCategories((prev) => ({ ...prev, [category]: true }));
            // Initialize search query for this category if not set.
            setSearchQueries((prev) => ({ ...prev, [category]: '' }));
            // If foods for this category haven't been loaded yet, fetch them.
            if (!foodsByCategory[category]) {
                fetch(`http://10.0.2.2:3000/getFoodsByCategory?category=${category}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error('Network response was not ok');
                        }
                        return response.json();
                    })
                    .then((data) => {
                        // Save the fetched foods in state.
                        setFoodsByCategory((prev) => ({ ...prev, [category]: data }));
                    })
                    .catch((error) => {
                        console.error('Error fetching foods for category:', category, error);
                    });
            }
        }
    };

    // Precompute an array with filtered foods for each category.
    const categoriesWithFilteredFoods = categories.map((categoryObj) => {
        const key = categoryObj.category;
        const searchQuery = searchQueries[key] || '';
        const foodsForCat = foodsByCategory[key] || [];
        const filteredFoods = foodsForCat.filter((food) => {
            const name = td(food, 'foodname') || '';
            return name.toLowerCase().includes(searchQuery.toLowerCase());
        });
        return { categoryObj, filteredFoods };
    });

    const renderFoodItem = ({ item }: { item: any }) => (
        <TouchableOpacity
            style={styles.foodItem}
            onPress={() => navigation.navigate('FoodDetail', { mealId, food: item })}
        >
            <Text style={styles.foodText}>{td(item, 'foodname') || t('Unnamed Food')}</Text>
        </TouchableOpacity>
    );

    if (loadingCategories) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{t('Select a Food Category')}</Text>
            {categoriesWithFilteredFoods.map(({ categoryObj, filteredFoods }) => (
                <View key={categoryObj.category} style={styles.categoryContainer}>
                    <TouchableOpacity
                        style={styles.categoryButton}
                        onPress={() => toggleCategory(categoryObj.category)}
                    >
                        <Text style={styles.categoryText}>{td(categoryObj, 'category')}</Text>
                    </TouchableOpacity>
                    {expandedCategories[categoryObj.category] && (
                        <View style={styles.dropdownContainer}>
                            <TextInput
                                style={styles.searchBar}
                                placeholder={t('Search in', { category: td(categoryObj, 'category'), })}
                                value={searchQueries[categoryObj.category] || ''}
                                onChangeText={(text) =>
                                    setSearchQueries((prev) => ({ ...prev, [categoryObj.category]: text }))
                                }
                            />
                            <FlatList
                                data={filteredFoods}
                                keyExtractor={(item, index) =>
                                    item.foodid ? item.foodid.toString() : index.toString()
                                }
                                renderItem={renderFoodItem}
                                style={styles.foodList}
                            />
                        </View>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#fff' },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    categoryContainer: { marginBottom: 16 },
    categoryButton: {
        backgroundColor: '#007BFF',
        padding: 12,
        borderRadius: 5,
        alignItems: 'center',
    },
    categoryText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
    dropdownContainer: { marginTop: 8, marginLeft: 16 },
    searchBar: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginBottom: 8,
        width: '90%',
    },
    foodList: {},
    foodItem: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginBottom: 6,
    },
    foodText: { color: '#FFF', fontWeight: 'bold', fontSize: 14 },
});

export default MealCategoryScreen;
