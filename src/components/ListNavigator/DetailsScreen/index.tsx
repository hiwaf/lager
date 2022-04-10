import { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import config from "../../../../config/config.json";
import { styles } from "../../../../styles";
import { pickOrder } from "../../../api";

const DetailsScreen = (props: any) => {
    const { navigation, route } = props;
    const { id } = route.params;
    const [singleOrder, setSingleOrder] = useState<any>(null);
    const [canPick, setCanPick] = useState<boolean>(true);

    useEffect(() => {
        fetch(`${config.base_url}/orders/${id}?api_key=${config.api_key}`)
            .then((response) => response.json())
            .then((result) => {
                setSingleOrder(result.data);
            });
    }, []);

    const changeOrder = async (singleOrder: object) => {
        const res = await pickOrder(singleOrder);
        if (res) {
            navigation.goBack();
            setSingleOrder(res);
        } else {
            setCanPick(false);
        }
    };

    if (singleOrder) {
        return (
            <View style={styles.base}>
                <Text style={styles.title}>{singleOrder.name}</Text>
                <Text style={styles.subtitle}>
                    {singleOrder.address}&nbsp;{singleOrder.city}&nbsp;
                    {singleOrder.zip}
                </Text>
                <Text style={styles.subtitle}>{singleOrder.country}</Text>
                <Text style={styles.title}>Produkter:</Text>
                {singleOrder.order_items.map((product: any, key: number) => (
                    <Text key={key} style={styles.subtitle}>
                        {product.name} - {product.amount} st -{" "}
                        {product.location}
                    </Text>
                ))}

                <Pressable
                    style={styles.button}
                    onPress={() => {
                        changeOrder(singleOrder);
                    }}
                >
                    <Text style={styles.buttonText}>Pick Order</Text>
                </Pressable>
                {!canPick && (
                    <Text style={styles.subtitle}>
                        Order cannot be picked, all items not in stock
                    </Text>
                )}
            </View>
        );
    } else {
        return (
            <View>
                <Text> Loading...</Text>
            </View>
        );
    }
};

export default DetailsScreen;
