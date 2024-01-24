import { View, Text, ScrollView, Image, StatusBar, TextInput, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { FaceSmileIcon } from 'react-native-heroicons/solid'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Category, Recipes } from '../components';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home({ navigation }) {

    const [mealCategory, setMealCategory] = useState([]);
    const [mealRecipe, setMealRecipe] = useState([])
    const [activeCategory, setActiveCategory] = useState("Starter")
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        getCategory();
        getRecipe();
    }, [])

    const getCategory = async () => {
        try {
            const response = await axios.get("https://themealdb.com/api/json/v1/1/categories.php")
            if (response && response.data) {
                setMealCategory(response.data.categories);
            }

        } catch (error) {
            console.log("error", error.message)
        }
    }

    const getRecipe = async (recipeCategory = "Seafood") => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${recipeCategory}`)
            if (response && response.data) {
                setMealRecipe(response.data.meals);
            }

        } catch (error) {
            console.log("error", error.message)
        }
    }

    const handleCategory = category => {
        getRecipe(category);
        setActiveCategory(category);
        setMealRecipe([])
    }

    const handleSearch = async () => {
        try {
            const response = await axios.get(`https://themealdb.com/api/json/v1/1/search.php?s=${searchQuery}`);
            if (response && response.data) {
                setMealRecipe(response.data.meals);
            }
        } catch (error) {
            console.log("error", error.message);
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1, height: hp(100) }}
            >
                <View className="flex-1 bg-white px-2">
                    <StatusBar backgroundColor="white" barStyle="dark-content" />
                    <ScrollView className="space-y-3 pt-4"
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 30 }}
                    >

                        {/* avatar and bell icon */}
                        <View className="flex-row justify-between items-center mb-2">
                            <Image source={require("../assets/avatar.png")} style={{ width: wp(10), height: hp(5) }} />
                            <BellIcon color="black" size={hp(4.5)} />
                        </View>

                        {/* user info and punchline */}
                        <View className="flex">
                            <Text className="text-neutral-700 font-medium mb-1" style={{ fontSize: wp(3.5) }}>Hello, Shubham..</Text>

                            <View className="flex-row items-center space-x-2">
                                <Text className="font-bold text-neutral-700 tracking-wide" style={{ fontSize: wp(7.5) }}>Make your own food,</Text>
                                <FaceSmileIcon color="rgba(180, 83, 9, 0.8)" size={hp(6)} />
                            </View>

                            <Text className="text-neutral-700 font-bold tracking-wide" style={{ fontSize: wp(7.5) }}>stay at
                                <Text className="text-amber-600 tracking-wide"> home</Text></Text>
                        </View>

                        {/* Search bar */}
                        <View className="flex-row justify-between px-2 items-center mb-2 rounded-full bg-neutral-200 ">
                            <TextInput placeholder="Search any receipe"
                                placeholderTextColor="gray"
                                style={{ fontSize: hp(2) }}
                                className="text-neutral-500"
                                value={searchQuery}
                                onChangeText={text => {
                                    setSearchQuery(text);
                                    // trigger real time search
                                    handleSearch()
                                }}

                            />

                            <View className="bg-white p-2 rounded-full">
                                <MagnifyingGlassIcon size={hp(3)} color="black" strokeWidth={2} onPress={handleSearch} />
                            </View>
                        </View>

                        {/* categories */}
                        <View>
                            {mealCategory.length > 0 && <Category categoriesData={mealCategory} activeCategory={activeCategory} handleCategory={handleCategory} />}
                        </View>

                        {/* recipes */}
                        <View>
                            <Recipes recipeData={mealRecipe} categoriesData={mealCategory} navigation={navigation} />
                        </View>

                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}