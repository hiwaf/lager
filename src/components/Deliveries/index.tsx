import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DeliveryListScreen from "./DeliveryListScreen";
import DeliveryDetailsScreen from "./DeliveryDetailsScreen";

const Stack = createNativeStackNavigator();

function StackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackButtonMenuEnabled: true
            }}
        >
            <Stack.Screen name='DeliveryHome' component={DeliveryListScreen} />
            <Stack.Screen name='DeliveryDetails' component={DeliveryDetailsScreen} />
        </Stack.Navigator>
    );
}

export default StackScreen;
