import { useEffect, useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { styles } from "../../../../styles";
import { getDeliveries } from "../../../api/deliveries";
import { useIsFocused } from "@react-navigation/native";

const DeliveryListScreen = (props: any) => {
    const { navigation, route } = props;

    const [deliveries, setDeliveries] = useState([]);

    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused)
            getDeliveries().then((res) => {
                setDeliveries(res.data);
            });
    }, [isFocused]);

    const Delivery = ({ delivery }: any) => {
        return (
            <View>
                <Text>
                    {delivery.amount} - {delivery.product_name}
                </Text>
                <Text>{delivery.delivery_date}</Text>
                <Text>{delivery.comment}</Text>
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            {deliveries.map((delivery: any, key: number) => (
                <Delivery key={key} delivery={delivery} />
            ))}
            <Pressable
                style={styles.button}
                onPress={() => navigation.navigate("DeliveryDetails")}
            >
                <Text style={styles.buttonText}>Add Delivery</Text>
            </Pressable>
        </ScrollView>
    );
};

export default DeliveryListScreen;
