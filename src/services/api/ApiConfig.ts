import { useEnvContext } from "../../hooks/useEnvContext";
import axios from "axios";

export const Api = () => {
    const development = true;
    const apiKey = process.env.REACT_APP_API_KEY;
    const apiHost = process.env.REACT_APP_API_HOST;
    const url = development ? 'http://localhost:3000' : `https://${apiHost}`;
    const headers = 
        development ? undefined : {
            "Content-Type": "application/json",
            "X-RapidAPI-Key": apiKey || "",
            "X-RapidAPI-Host": apiHost || ""
        }

    return axios.create({
        baseURL: url,
        headers: headers
    });
}