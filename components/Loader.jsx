import { View, ActivityIndicator } from 'react-native'

export default function Loader(props) {
    return (
        <View className="flex justify-center items-center mt-24">
            <ActivityIndicator {...props} size="large" color="black" />
        </View>
    )
}