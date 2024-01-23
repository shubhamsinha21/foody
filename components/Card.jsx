import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import Animated, { FadeInDown, springify } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Card({ item, id }) {
    return (
        <Animated.View entering={FadeInDown.delay(id + 100).duration(600).springify().damping(10)}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: "100px", justifyContent: "space-around" }}
                style={{ width: "100%" }}
                className={`flex justify-center mb-4 space-y-2 ${id % 2 === 0 ? "pl-2" : 0} ${id % 2 === 0 ? 0 : "pr-2"}`}
                key={id}
            >
                <Image source={{ uri: item.strMealThumb }}
                    style={{ width: "100%", height: id % 3 === 0 ? hp(25) : hp(30) }}
                    className="bg-black/5 rounded-xl"
                />
            </ScrollView>
        </Animated.View>
    )
}