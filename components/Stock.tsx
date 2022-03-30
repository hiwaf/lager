import { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import config from "../config/config.json";

function StockList() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result), setProducts(result.data);
            });
    }, []);

    const list = products.map((product, index) => (
        <View key={index} style={styles.product}>
            <Text style={styles.text}>{product.name}</Text>
            <Text style={styles.text}>{product.stock}</Text>
        </View>
    ));

    return <View>{list}</View>;
}

export default function Stock() {
    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            <Text style={styles.title}>Lagerförteckning</Text>
            <StockList />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    title: {
        justifyContent: "center",
        textAlign: "center",
        color: "#33c",
        fontSize: 28,
        marginBottom: 8
    },
    text: {
        fontSize: 18
    },
    product: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 12,
        borderWidth: 1,
        marginVertical: 4,
        padding: 8
    }
});
