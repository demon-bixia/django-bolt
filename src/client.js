import axios from "axios";
import config from "./config";

let client = axios.create({
    baseURL: config.url.href, timeout: 3000, withCredentials: true,
});

export default client