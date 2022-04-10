import { View, Image } from "react-native";
import { styles } from "../../../styles";
import warehouse from "../../../assets/warehouse.jpg";
import Stock from "./Stock/Stock";

const HomeScreen = () => {
    return (
        <View style={styles.base}>
            <Image source={warehouse} style={styles.image} />
            <Stock />
        </View>
    );
};

export default HomeScreen;
