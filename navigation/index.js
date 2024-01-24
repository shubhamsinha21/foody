import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Home, Welcome, Recipe } from "../screens";

const Stack = createNativeStackNavigator();

export default function MyStack() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Recipe" component={Recipe} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}