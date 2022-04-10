import config from "../../config/config.json";
import { updateProduct } from "./products";

export const getOrders = async () => {
    const response = await fetch(
        `${config.base_url}/orders?api_key=${config.api_key}`
    );
    const data = await response.json();
    return data;
};

export const getOrder = async (id: number) => {
    const response = await fetch(
        `${config.base_url}/orders/${id}?api_key=${config.api_key}`
    );
    const data = await response.json();
    return data;
};

const updateOrder = async (order: any) => {
    const changedOrder = {
        ...order,
        api_key: config.api_key
    };
    try {
        const res = await fetch(`${config.base_url}/orders/`, {
            method: "PUT",
            body: JSON.stringify(changedOrder),
            headers: {
                "content-type": "application/json"
            }
        });
        if (res.status === 204) {
            return true;
        } else {
            return false;
        }
    } catch (err) {
        console.log("THIS BE ERROR", err);
    }
};

export const pickOrder = async (order: any) => {
    let valid = true;
    order.order_items.map((item: any) => {
        if (item.stock < item.amount) {
            valid = false;
        }
    });

    if (valid) {
        order.order_items.map(async (item: any) => {
            item.stock -= item.amount;
            await updateProduct(item);
        });

        order.status_id = 200;
        order.status = "Packad";
        const res = await updateOrder(order);
        if (res) {
            return order;
        }
    }
    return false;
};
