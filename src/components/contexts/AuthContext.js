import {createContext, useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import client from "../../client";
import config from "../../config";
import Preloader from "../utils/Preloader";

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [authToken, setAuthToken] = useState(Cookies.get('authToken') || null);
    const [csrfToken, setCsrfToken] = useState(Cookies.get('csrfToken') || null);
    const [loading, setLoading] = useState(true); // always start with loading

    const navigate = useNavigate();
    const location = useLocation();

    const invalidTokenInterceptors = client.interceptors.response.use(response => response, error => {
        // if the token is invalid remove the auth token and redirect to login
        if (error.response && error.response.status === 401) {
            setAuthToken(null);
            Cookies.remove('authToken', {path: '', domain: config.url.hostname});
            navigate('login/', {replace: true, state: {"from": location}});
        }
        return Promise.reject(error);
    });

    useEffect(() => {
        if (loading) {
            // fetch the csrf token and save it
            client.get('/csrf_token/')
                .then(response => {
                    if (response.status === 200) {
                        setCsrfToken(response.data['csrftoken'])
                        Cookies.set('csrfToken', response.data['csrftoken']);
                    }
                })
                .then(() => {
                    // test the current auth token if it fails remove it and redirect to login page
                    if (authToken)
                        client.get('/index/', {headers: {"Authorization": `Token ${authToken}`}})
                            .then(response => console.log(response))
                            .catch(error => console.log(error.response.status))
                })
                .then(() => {
                    if (loading) setLoading(false);
                })

            return () => {
                client.interceptors.response.eject(invalidTokenInterceptors);
            };
        }
    }, [loading, authToken, invalidTokenInterceptors]);

    return (<AuthContext.Provider value={{authToken, setAuthToken, csrfToken, setCsrfToken}}>
        {loading ? <Preloader/> : children}
    </AuthContext.Provider>);
};

export default AuthContext;