import { useEffect, useState } from "react";
import { View, Text, Pressable, TextInput, ScrollView } from "react-native";
import { styles } from "../../../../styles";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { getProducts, addDelivery } from "../../../api";

const DetailsScreen = (props: any) => {
    const { navigation, route } = props;
    const [products, setProducts] = useState<any[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Object>({});
    const [quantity, setQuantity] = useState<string>("");
    const [comment, setComment] = useState<string>("");
    const [date, setDate] = useState<Date>(new Date());

    useEffect(() => {
        getProducts().then((res) => {
            setProducts(res.data);
            setSelectedProduct(res.data[0].id);
        });
    }, []);

    const saveDelivery = () => {
        const delivery = {
            product: products.find(
                (product: any) => product.id === selectedProduct
            ),
            amount: quantity,
            comment: comment,
            delivery_date: date
        };

        addDelivery(delivery).then((res) => {
            if (res) navigation.goBack();
        });
    };

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 60 }}>
            <Text style={styles.title}>New Delivery</Text>
            <Text style={styles.subtitle}>Product</Text>
            <View style={styles.picker}>
                <Picker
                    selectedValue={selectedProduct}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedProduct(itemValue)
                    }
                >
                    {products.map((product: any, key: number) => (
                        <Picker.Item
                            key={key}
                            label={product.name}
                            value={product.id}
                        />
                    ))}
                </Picker>
            </View>
            <Text style={styles.subtitle}>Delivery Date</Text>
            <View style={styles.picker}>
                <DateTimePicker
                    value={date}
                    mode='date'
                    display='default'
                    onChange={(_e: any, date: any) => {
                        setDate(date);
                    }}
                />
            </View>
            <View>
                <Text style={styles.subtitle}>Amount</Text>
                <TextInput
                    placeholder='Quanity'
                    keyboardType='numeric'
                    onChangeText={(text) => setQuantity(text)}
                    value={quantity}
                />
            </View>
            <View>
                <Text style={styles.subtitle}>Comment</Text>
                <TextInput
                    placeholder='Comment'
                    onChangeText={(text) => setComment(text)}
                    value={comment}
                />
            </View>
            <Pressable style={styles.button} onPress={saveDelivery}>
                <Text style={styles.buttonText}>Save</Text>
            </Pressable>
        </ScrollView>
    );
};

export default DetailsScreen;
