import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown, springify } from 'react-native-reanimated';

export default function Category({ categoriesData, getRecipe, setMealRecipe }) {

    const [activeCategory, setActiveCategory] = useState("Starter")

    const hanldeCategory = ({ category }) => {
        getRecipe(category);
        setActiveCategory(category)
        setMealRecipe()
    }

    return (
        <Animated.View entering={FadeInDown.duration(2000).springify()}>
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 15 }}
                showsHorizontalScrollIndicator={false}
                className="space-x-4">

                {categoriesData.map((category, index) => {

                    return (
                        <TouchableOpacity
                            key={index}
                            className="flex items-center space-y-2"
                            onPress={() => hanldeCategory(category.strCategory)}
                        >
                            <View className={`rounded-full p-1.5 ${category.strCategory === activeCategory ? "bg-orange-700" : "bg-gray-200"}`}>
                                <Image source={{ uri: category.strCategoryThumb }}
                                    style={{ width: wp(15), height: hp(8) }}
                                    className="rounded-full"
                                />
                            </View>
                            <Text className="text-neutral-700 font-neutral">{category.strCategory}</Text>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
        </Animated.View>
    )
}