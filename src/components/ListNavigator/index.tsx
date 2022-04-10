import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "./ListScreen";
import DetailsScreen from "./DetailsScreen";

const Stack = createNativeStackNavigator();

function StackScreen() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerBackButtonMenuEnabled: true
            }}
        >
            <Stack.Screen name='Home' component={ListScreen} />
            <Stack.Screen name='Details' component={DetailsScreen} />
        </Stack.Navigator>
    );
}

export default StackScreen;
