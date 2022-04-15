import config from "../../config/config.json";

export const login = async (email: string, password: string) => {
    const response = await fetch(`${config.base_url}/auth/login`, {
        method: "POST",
        body: JSON.stringify({
            api_key: config.api_key,
            email,
            password
        }),
        headers: {
            "content-type": "application/json"
        }
    });
    const data = await response.json();
    if (data.data.type === "success") {
        return data.data;
    } else {
        throw new Error(data.data.message);
    }
};

export const register = async (email: string, password: string) => {
    const response = await fetch(`${config.base_url}/auth/register`, {
        method: "POST",
        body: JSON.stringify({
            api_key: config.api_key,
            email,
            password
        }),
        headers: {
            "content-type": "application/json"
        }
    });
    const data = await response.json();
    console.log("Från Auth", data);
    if (data.data.message === "User successfully registered.") {
        return data.data;
    } else {
        throw new Error(data.data.message);
    }
};
