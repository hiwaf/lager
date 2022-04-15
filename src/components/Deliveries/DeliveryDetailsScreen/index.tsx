import { useEffect, useState } from "react";
import {
    View,
    Text,
    Pressable,
    TextInput,
    ScrollView,
    Platform,
    Button
} from "react-native";
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
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

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
            console.log("addDelivery", res);
            if (res) navigation.goBack();
        });
    };

    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 60 }}
            style={{ backgroundColor: "#fff", padding: 20 }}
        >
            <View style={styles.container}>
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
                <View>
                    {Platform.OS === "android" && (
                        <Button
                            onPress={showDatePicker}
                            title='Visa datumväljare'
                        />
                    )}
                    {(show || Platform.OS === "ios") && (
                        <DateTimePicker
                            value={date}
                            mode='date'
                            display='default'
                            onChange={(_e: any, date: any) => {
                                if (Platform.OS === "android") {
                                    setShow(false);
                                }
                                setDate(date || new Date());
                            }}
                            style={styles.datePicker}
                        />
                    )}
                </View>
                <View>
                    <Text style={styles.subtitle}>Amount</Text>
                    <TextInput
                        placeholder='Quanity'
                        keyboardType='numeric'
                        onChangeText={(text) => setQuantity(text)}
                        value={quantity}
                        style={styles.textInput}
                    />
                </View>
                <View>
                    <Text style={styles.subtitle}>Comment</Text>
                    <TextInput
                        placeholder='Comment'
                        onChangeText={(text) => setComment(text)}
                        value={comment}
                        style={styles.textInput}
                    />
                </View>
                <Pressable style={styles.button} onPress={saveDelivery}>
                    <Text style={styles.buttonText}>Save</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default DetailsScreen;
