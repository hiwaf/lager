import config from "../../config/config.json";
import { updateProduct } from "./products";

export const getDeliveries = async () => {
    const response = await fetch(
        `${config.base_url}/deliveries?api_key=${config.api_key}`
    ).then((res) => res.json());

    const data = response;
    return data;
};

export const getDelivery = async (id: number) => {
    const response = await fetch(
        `${config.base_url}/deliveries/${id}?api_key=${config.api_key}`
    );
    const data = await response.json();
    return data;
};

export const addDelivery = async (delivery: any) => {
    const newDelivery = {
        ...delivery,
        product_id: delivery.product.id,
        api_key: config.api_key
    };
    try {
        const res = await fetch(`${config.base_url}/deliveries/`, {
            method: "POST",
            body: JSON.stringify(newDelivery),
            headers: {
                "content-type": "application/json"
            }
        }).then((res) => res.json());

        if (res) {
            const { product } = delivery;
            console.log("THIS SADASD ,", product);
            await updateProduct({
                ...product,
                product_id: product.id,
                stock: parseInt(product.stock) + parseInt(delivery.amount)
            });
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("THIS BE ERROR", err);
    }
};
