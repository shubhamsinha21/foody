import { View, Text, Image, StatusBar } from 'react-native'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Animated, { } from 'react-native-reanimated';

export default function Welcome() {
    return (
        <View className="bg-orange-500 flex-1 justify-center items-center space-y-8">
            <StatusBar backgroundColor="rgba(249,115,22,1)" barStyle="light-content" />


            {/* welcome screen image with rings */}
            <View className="bg-orange-300/20 p-12 rounded-full ">
                <View className="bg-orange-400/100 p-10 rounded-full">
                    <Image source={require("../assets/welcome.jpg")}
                        className="w-52 h-52 rounded-full opacity-100" />
                </View>
            </View>

            {/* title and punchline */}
            <View className="space-y-4 flex items-center">
                <Text className="text-white font-extrabold tracking-widest text-5xl">
                    Foody
                </Text>
                <Text className="text-white font-semibold tracking-widest text-xl border border-white p-2 bg-orange-400 rounded-lg">
                    THE TASTE OF INDIA
                </Text>
            </View>

        </View>
    )
}