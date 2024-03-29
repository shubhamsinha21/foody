import { Text, Pressable, Image } from 'react-native'
import Animated, { FadeInDown } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Card({ item, id, navigation }) {
    let isEven = item.id % 2 === 0;
    let isHeight = item.idMeal % 3 === 0;
    return (
        <Animated.View entering={FadeInDown.delay(id + 100).duration(400).springify().damping(12)}>

            <Pressable
                style={{ width: "100%", paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0 }}
                className="flex justify-center space-y-1 -ml-1"
                onPress={() => navigation.navigate("Recipe", { ...item })}
            >
                <Image source={{ uri: item.strMealThumb }}
                    style={{ width: "100%", height: isHeight ? hp(25) : hp(35) }}
                    className="bg-black/5 rounded-lg"
                    sharedTransitionTag={item.id}

                />

                <Text className="text-neutral-700 font-medium mb-1">{item.strMeal.length > 10 ? item.strMeal.slice(0, 10) + "..." : item.strMeal}</Text>

            </Pressable>

        </Animated.View>
    )
}