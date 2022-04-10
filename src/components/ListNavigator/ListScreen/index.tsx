import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { styles } from "../../../../styles";
import { getOrders } from "../../../api";
import { useIsFocused } from "@react-navigation/native";

function ListScreen({ navigation }: { navigation: any }) {
    const [orders, setOrders] = useState<any[]>([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        console.log("isFocused", isFocused);
        if (isFocused)
            getOrders().then((res) => {
                setOrders(
                    res.data.filter((order: any) => order.status_id === 100)
                );
            });
    }, [isFocused]);

    const list = orders.map((order, index) => (
        <View key={index}>
            <Pressable
                onPress={() => {
                    navigation.navigate("Details", {
                        id: order.id
                    });
                }}
            >
                <View style={styles.listItem}>
                    <Text>{order.name}</Text>
                </View>
            </Pressable>
        </View>
    ));

    return (
        <View>
            <Text style={styles.subtitle}>Orders ready to get picked up:</Text>
            {list}
        </View>
    );
}

export default ListScreen;
