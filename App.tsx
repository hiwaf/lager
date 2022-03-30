import { StatusBar } from "expo-status-bar";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import warehouse from "./assets/warehouse.jpg";
import Stock from "./components/Stock";

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.base}>
                <Text style={styles.title}>Lager-Appen</Text>
                <Image source={warehouse} style={{ width: "100%", height: 240, marginBottom: 8 }} />
                <Stock />
                <StatusBar style='auto' />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    base: {
        flex: 1,
        backgroundColor: "#fefefe",
    },
    title: {
        justifyContent: "center",
        textAlign: "center",
        color: "#33c",
        fontSize: 42,
        marginBottom: 8
    }
});
