import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./src/components/HomeScreen";
import ListScreen from "./src/components/ListNavigator/index";

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen
                        name='Lager'
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name='List'
                        component={ListScreen}
                        options={{ headerShown: false }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}
