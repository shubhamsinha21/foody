import { View, Text, ScrollView, StatusBar, Image, TouchableOpacity } from 'react-native'
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UserIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { Loader } from '../components';
import YoutubeIframe from 'react-native-youtube-iframe';

export default function Recipe(props) {

    const [isFav, setIsFav] = useState(false)
    const [recipeDetail, setRecipeDetail] = useState(null)
    const [loading, setLoading] = useState(true)

    const item = props.route.params;
    const { navigation } = props;

    useEffect(() => {
        getRecipeDetails(item.idMeal)
    })


    const getRecipeDetails = async (id) => {
        try {
            const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`)
            if (response && response.data) {
                setRecipeDetail(response.data.meals[0]);
                setLoading(false);
            }

        } catch (error) {
            console.log("error", error.message)
        }
    }

    const ingredientsIndexes = (recipeDetail) => {
        if (!recipeDetail) return [];
        let indexes = []
        for (let i = 1; i <= 20; i++) {
            if (recipeDetail["strIngredient" + i]) {
                indexes.push(i)
            }
        }
        return indexes;
    }

    const getYoutubeVideo = url => {
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        return null;
    }

    return (
        <ScrollView className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
        >
            <StatusBar barStyle={"light-content"} hidden={true} />

            {/* recipe image */}
            <View className="flex-row justify-center">
                <Image source={{ uri: item.strMealThumb }}
                    style={{ width: wp(98), height: hp(50) }}
                    className="rounded-t-xl rounded-b-3xl m-1"
                />
            </View>

            {/* back button */}
            <View className="w-full absolute flex-row justify-between items-center pt-8">
                <TouchableOpacity className="bg-white rounded-full p-2 ml-5"
                    onPress={() => navigation.navigate("Home")}
                >
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity className="bg-white rounded-full p-2 mr-5"
                    onPress={() => setIsFav(!isFav)}>
                    <HeartIcon size={hp(4)} color={isFav ? "red" : "#B9B9B1"} />
                </TouchableOpacity>
            </View>

            {/* meal description */}
            {loading ?
                (<Loader size="large" className="mt-16" />)
                : (
                    <View className="flex justify-between space-y-4 pt-8 ml-2">
                        <View View className="space-y-2">
                            <Text style={{ fontSize: hp(2.5) }} className="font-bold flex-1 text-neutral-700">
                                {recipeDetail?.strMeal}
                            </Text>

                            <Text style={{ fontSize: hp(2) }} className="font-bold flex-1 text-neutral-500">
                                {recipeDetail?.strArea}
                            </Text>


                            {/* miscellaneous */}
                            <View className="flex-row justify-evenly">

                                <View className="flex rounded-full bg-orange-500 items-center p-2">

                                    <View
                                        style={{ height: hp(5), width: wp(10) }}
                                        className="bg-white rounded-full flex items-center justify-center p-4"
                                    >
                                        <ClockIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                            35
                                        </Text>
                                        <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">
                                            Mins
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex rounded-full bg-orange-500 p-2 items-center">
                                    <View
                                        style={{ height: hp(5), width: wp(10) }}
                                        className="bg-white rounded-full flex items-center justify-center"
                                    >
                                        <UserIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                            03
                                        </Text>
                                        <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">
                                            Servings
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex rounded-full bg-orange-500 p-2 items-center">
                                    <View
                                        style={{ height: hp(5), width: wp(10) }}
                                        className="bg-white rounded-full flex items-center justify-center"
                                    >
                                        <FireIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">
                                            103
                                        </Text>
                                        <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">
                                            Cal
                                        </Text>
                                    </View>
                                </View>


                                <View className="flex rounded-full bg-orange-500 p-2 items-center">
                                    <View
                                        style={{ height: hp(5), width: wp(10) }}
                                        className="bg-white rounded-full flex items-center justify-center"
                                    >
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View className="flex items-center py-2 space-y-1">
                                        <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700">

                                        </Text>
                                        <Text style={{ fontSize: hp(1.5) }} className="font-bold text-neutral-700">
                                            Easy
                                        </Text>
                                    </View>
                                </View>
                            </View>


                            {/* ingredients */}
                            <View className="space-y-4 ">
                                <Text className="text-neutral-700 font-bold flex-1"
                                    style={{ fontSize: hp(2.5) }}>
                                    Ingredients
                                </Text>
                                <View className="space-y-2 ml-3">
                                    {
                                        ingredientsIndexes(recipeDetail).map(i => {
                                            return (
                                                <View key={i} className="flex-row space-x-4 items-center">
                                                    <View style={{ height: hp(1), width: wp(2) }}
                                                        className="bg-orange-500 rounded-full">
                                                    </View>
                                                    <View className="flex-row space-x-2">
                                                        <Text className="font-extrabold text-neutral-700">{recipeDetail["strMeasure" + i]}</Text>
                                                        <Text className="font-medium text-neutral-700">{recipeDetail["strIngredient" + i]}</Text>
                                                    </View>


                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>

                            {/* instructions */}
                            <View className="space-y-4">
                                <Text className="text-neutral-700 font-bold flex-1"
                                    style={{ fontSize: hp(2.5) }}>
                                    Instructions
                                </Text>
                                <Text className="text-neutral-700" style={{ fontSize: hp(2) }}>
                                    {recipeDetail?.strInstructions}
                                </Text>
                            </View>


                            {/* recipe video */}

                            {recipeDetail.strYoutube && (
                                <View>
                                    <Text className="font-bold text-neutral-700" style={{ fontSize: hp(2.5) }}> Recipe Video</Text>
                                    <View>
                                        <YoutubeIframe
                                            videoId={getYoutubeVideo(recipeDetail.strYoutube)}
                                            height={hp(30)} />
                                    </View>
                                </View>
                            )}




                        </View>

                    </View >

                )}


        </ScrollView >
    )
}