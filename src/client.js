import axios from "axios";
import Cookies from "js-cookie";


const client = axios.create({
    baseURL: 'http://localhost:8000/api_admin/',
    timeout: 3000,
    withCredentials: true,
    headers: {
        "X-CSRFToken": Cookies.get("csrftoken"),
    }
});

export default client;