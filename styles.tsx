import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    base: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fefefe"
    },
    title: {
        justifyContent: "center",
        textAlign: "center",
        color: "#33c",
        fontSize: 42,
        marginBottom: 8
    },
    image: {
        width: "100%",
        height: 240,
        marginBottom: 8
    },
    listItem: {
        padding: 8,
        backgroundColor: "#fefefe"
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8
    },
    button: {
        backgroundColor: "#33c",
        padding: 8,
        marginTop: 8
    },
    buttonText: {
        color: "#fff",
        fontSize: 18
    },
    picker: {
        marginBottom: 8
    }
});
