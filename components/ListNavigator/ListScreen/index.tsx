import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import config from "../../../config/config.json";
import { styles } from "../../../styles";

function ListScreen({ navigation }: { navigation: any }) {
    const [orders, setOrders] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${config.base_url}/orders?api_key=${config.api_key}`)
            .then((response) => response.json())
            .then((result) => {
                setOrders(result.data);
            });
    }, []);

    const list = orders.map((order, index) => (
        <View key={index}>
            <Pressable
                onPress={() => {
                    navigation.navigate("Details", {
                        id: order.id
                    });
                }}
            >
                <Text>{order.name}</Text>
            </Pressable>
        </View>
    ));

    return <View>{list}</View>;
}

export default ListScreen;
