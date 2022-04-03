import { useState, useEffect } from "react";
import { Text, View, ScrollView } from "react-native";
import config from "../../../config/config.json";
import { styles } from "./styles";

function StockList() {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${config.base_url}/products?api_key=${config.api_key}`)
            .then((response) => response.json())
            .then((result) => {
                setProducts(result.data);
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
