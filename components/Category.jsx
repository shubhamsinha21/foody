import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { categoriesData } from '../constants/constants'

export default function Category() {
    return (
        <View>
            <ScrollView>
                {categoriesData.map((category, index) => {
                    return (
                        <TouchableOpacity key={index}>
                            <View>
                                <Image source={category.image} className="rounded-2xl" />

                            </View>
                        </TouchableOpacity>
                    )
                })}

            </ScrollView>
        </View>
    )
}