import config from "../../config/config.json";

export const getProducts = async () => {
    const response = await fetch(
        `${config.base_url}/products?api_key=${config.api_key}`
    );
    const data = await response.json();
    return data;
};

export const getProduct = async (id: number) => {
    const response = await fetch(
        `${config.base_url}/products/${id}?api_key=${config.api_key}`
    );
    const data = await response.json();
    return data;
};

export const updateProduct = async (product: any) => {
    const changedProduct = {
        ...product,
        id: product.product_id,
        api_key: config.api_key
    };
    try {
        const res = await fetch(`${config.base_url}/products/`, {
            method: "PUT",
            body: JSON.stringify(changedProduct),
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
