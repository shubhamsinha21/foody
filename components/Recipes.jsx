import React from 'react';
import { View, Text } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Loader } from '../components';
import MasonryList from '@react-native-seoul/masonry-list';

export default function Recipes({ recipeData, categoriesData, navigation }) {
    // Check if categoriesData or recipeData is null or undefined
    if (!categoriesData || !recipeData) {
        console.error("Categories data or recipe data is null or undefined.");
        return null;
    }

    // Check if categoriesData or recipeData is an array and has a length property
    const isCategoriesDataEmpty = !Array.isArray(categoriesData) || categoriesData.length === 0;
    const isRecipeDataEmpty = !Array.isArray(recipeData) || recipeData.length === 0;

    return (
        <View className=" space-y-3">
            <Text className="text-neutral-700 font-semibold" style={{ fontSize: hp(3) }}>Recipes</Text>
            <View>
                {isCategoriesDataEmpty || isRecipeDataEmpty ? (
                    <Loader />
                ) : (
                    <MasonryList
                        data={recipeData}
                        keyExtractor={(item) => item.idMeaL}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, id }) => <Card item={item} id={id} navigation={navigation} />}
                    />
                )}
            </View>
        </View>
    );
}
