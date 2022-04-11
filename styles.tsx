import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    base: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#fff"
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
        backgroundColor: "#fff"
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 8
    },
    button: {
        elevation: 8,
        backgroundColor: "#33c",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    buttonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    picker: {
        marginBottom: 8
    },
    datePicker: {
        width: "100%",
        height: 40,
        marginBottom: 8,
        borderColor: "#33c",
        borderWidth: 1,
        borderRadius: 4
    },
    textInput: {
        marginBottom: 8,
        height: 40,
        borderColor: "#33c",
        borderWidth: 1,
        borderRadius: 4,
        padding: 8
    }
});
