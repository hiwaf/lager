import { View, Text, Pressable, TextInput } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./style";
import { useEffect, useState } from "react";
import { login, register } from "../../../api/auth";

const LoginScreen = (props: any) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setError("");
    }, [username, password]);

    const { setToken } = props;

    const signIn = async () => {
        try {
            const token = await login(username, password);
            const tokenAndDate = {
                token: token,
                date: new Date().getTime()
            };
            console.log(token);
            const jsonValue = JSON.stringify(tokenAndDate);
            setToken(tokenAndDate);
            await AsyncStorage.setItem("@token", jsonValue);
        } catch (e) {
            setError("Incorrect username or password");
        }
    };

    const registerUser = async () => {
        try {
            const token = await register(username, password);
            const tokenAndDate = {
                token: token,
                date: new Date().getTime()
            };
            console.log(token);
            const jsonValue = JSON.stringify(tokenAndDate);
            setToken(tokenAndDate);
            await AsyncStorage.setItem("@token", jsonValue);
        } catch (e) {
            setError("Sign up failed");
        }
    };

    return (
        <View style={styles.loginScreenContainer}>
            <View style={styles.loginFormView}>
                <Text style={styles.logoText}>Instamobile</Text>
                <TextInput
                    placeholder='Username'
                    placeholderTextColor='#c4c3cb'
                    style={styles.loginFormTextInput}
                    onChangeText={(text) => setUsername(text)}
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor='#c4c3cb'
                    style={styles.loginFormTextInput}
                    secureTextEntry={true}
                    onChangeText={(text) => setPassword(text)}
                />
                <Pressable
                    onPress={() => {
                        signIn();
                    }}
                >
                    <Text>Login</Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        registerUser();
                    }}
                >
                    <Text>Register</Text>
                </Pressable>

                {error != "" ? <Text>{error}</Text> : null}
            </View>
        </View>
    );
};

export default LoginScreen;
