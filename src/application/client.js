import axios from "axios";
import config from "./config";

let client = axios.create({
    baseURL: config.url.href, timeout: 10000, withCredentials: true,
});

// log the error message
client.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default client
