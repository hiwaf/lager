import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import config from "../../../config/config.json";
import { styles } from "../../../styles";

const DetailsScreen = ({ route }: { route: any }) => {
    const {id } = route.params;
    const [singleOrder, setSingleOrder] = useState<any>(null);

    useEffect(() => {
        console.log(id);
        fetch(`${config.base_url}/orders/${id}?api_key=${config.api_key}`)
            .then((response) => response.json())
            .then((result) => {
                console.log(result), setSingleOrder(result.data);
            });
    }, []);

    if (singleOrder) {
        return (
            <View>
                <Text> {singleOrder.name}</Text>
                <Text> {singleOrder.status_id}</Text>
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
