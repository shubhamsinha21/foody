import { useEffect } from 'react';
import { View, Text, Image, StatusBar } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';


export default function Welcome({ navigation }) {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    useEffect(() => {
        requestAnimationFrame(() => {
            ring1padding.value = 0;
            ring2padding.value = 0;
            setTimeout(() => ring1padding.value = withSpring(ring1padding.value + wp(12)), 100);
            setTimeout(() => ring2padding.value = withSpring(ring2padding.value + wp(10)), 300);

            setTimeout(() => navigation.navigate("Home"), 2000)
        })
    }, [])
    return (
        <View className="bg-orange-500 flex-1 justify-center items-center space-y-5">
            <StatusBar backgroundColor="rgba(249,115,22,1)" barStyle="light-content" />


            {/* welcome screen image with rings */}
            <Animated.View className="bg-orange-300/20 rounded-full" style={{ padding: ring1padding }}>
                <Animated.View className="bg-orange-400/100 rounded-full" style={{ padding: ring2padding }}>
                    <Image source={require("../assets/welcome.jpg")}
                        className="rounded-full opacity-100" style={{ width: wp(50), height: hp(30) }} />
                </Animated.View>
            </Animated.View>

            {/* title and punchline */}
            <View className="space-y-4 flex items-center">
                <Text className="text-white font-extrabold tracking-widest"
                    style={{ fontSize: wp(12) }}
                >
                    Foody
                </Text>
                <Text className="text-white font-semibold tracking-widest border border-white bg-orange-400 rounded-lg"
                    style={{ fontSize: wp(4.5), padding: wp(2) }}
                >
                    THE TASTE OF INDIA
                </Text>
            </View>

        </View>
    )
}