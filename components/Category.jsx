import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { categoriesData } from '../constants'
import Animated, { FadeInDown, springify } from 'react-native-reanimated';

export default function Category() {

    const [activeCategory, setActiveCategory] = useState("Starter")

    return (
        <Animated.View entering={FadeInDown.duration(2000).springify()}>
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 30 }}
                showsHorizontalScrollIndicator={false}
                className="space-x-4">

                {categoriesData.map((category, index) => {

                    return (
                        <TouchableOpacity
                            key={index}
                            className="flex items-center space-y-2"
                            onPress={() => setActiveCategory(category.name)}
                        >
                            <View className={`rounded-full p-1.5 ${category.name === activeCategory ? "bg-orange-300" : "bg-gray-100"}`}>
                                <Image source={category.image}
                                    style={{ width: wp(14), height: hp(9) }}
                                    className="rounded-full"
                                />
                            </View>
                            <Text className="text-neutral-700 font-neutral">{category.name}</Text>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
        </Animated.View>
    )
}