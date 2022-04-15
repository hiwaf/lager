import { StatusBar } from "expo-status-bar";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/components/HomeScreen";
import ListScreen from "./src/components/ListNavigator";
import DeliveryScreen from "./src/components/Deliveries";
import LoginScreen from "./src/components/Auth/LoginScreen";
import { Text, Pressable } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function App() {
    const [signedIn, setSignedIn] = useState<boolean>(false);

    useEffect(() => {
        console.log("App useEffect");
        const readToken = async () => {
            try {
                console.log("readToken");
                const jsonValue = await AsyncStorage.getItem("@token");
                const res = jsonValue != null ? true : false;
                setSignedIn(res);
            } catch (e) {
                // error reading value
            }
        };
        readToken();
    }, []);

    const logout = async () => {
        console.log("Logout");
        try {
            await AsyncStorage.removeItem("@token");
            setSignedIn(false);
        } catch (e) {
            console.log(e);
        }
    };

    const signedInScreen = () => {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === "Lager") {
                                iconName = focused
                                    ? "ios-information-circle"
                                    : "ios-information-circle-outline";
                            } else if (route.name === "List") {
                                iconName = focused ? "body" : "body-outline";
                            } else {
                                iconName = focused
                                    ? "ios-list"
                                    : "ios-list-outline";
                            }

                            return (
                                <Ionicons
                                    name={iconName}
                                    size={size}
                                    color={color}
                                />
                            );
                        },
                        tabBarActiveTintColor: "tomato",
                        tabBarInactiveTintColor: "gray"
                    })}
                >
                    <Tab.Screen
                        name='Lager'
                        component={HomeScreen}
                        options={{
                            headerRight: () => (
                                <Pressable
                                    onPress={() => logout()}
                                    style={{
                                        padding: 10,
                                        margin: 0,
                                        elevation: 5
                                    }}
                                >
                                    <Text
                                        style={{
                                            fontSize: 20,
                                            color: "tomato"
                                        }}
                                    >
                                        Logout
                                    </Text>
                                </Pressable>
                            )
                        }}
                    />
                    <Tab.Screen
                        name='List'
                        component={ListScreen}
                        options={{ headerShown: false }}
                    />
                    <Tab.Screen
                        name='Deliveries'
                        component={DeliveryScreen}
                        options={{ headerShown: false }}
                    />
                </Tab.Navigator>
            </NavigationContainer>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style='auto' />
            {signedIn ? (
                signedInScreen()
            ) : (
                <LoginScreen setToken={setSignedIn} />
            )}
        </SafeAreaView>
    );
}
