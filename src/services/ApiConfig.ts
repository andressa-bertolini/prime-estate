import axios from "axios";

export const Api = () => {
    const apiHost = import.meta.env.VITE_API_HOST;

    return axios.create({
        baseURL: `https://${apiHost}`
    });
}