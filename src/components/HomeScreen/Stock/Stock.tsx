import { useState, useEffect } from "react";
import { Text, View, ScrollView, Pressable } from "react-native";
import config from "../../../../config/config.json";
import { styles } from "./styles";
import { getOrders } from "../../../api/orders";
import { getProducts, updateProduct } from "../../../api/products";
import { useIsFocused } from "@react-navigation/native";

function StockList() {
    const [products, setProducts] = useState<any[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            getProducts().then((res) => {
                setProducts(res.data);
            });
    }, [isFocused]);

    const list = products.map((product, index) => {
        return (
            <Pressable key={index} style={styles.product}>
                <Text style={styles.text}>{product.name}</Text>
                <Text style={styles.text}>{product.stock}</Text>
            </Pressable>
        );
    });

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
