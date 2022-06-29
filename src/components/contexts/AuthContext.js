import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router";
import {useLocation} from "react-router-dom";
import Cookies from 'js-cookie';
import client from "../../client";
import config from "../../config";
import Preloader from "../utils/Preloader";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(JSON.parse(Cookies.get('bolt-user') || "{}"));
    const [csrfToken, setCsrfToken] = useState(Cookies.get('csrfToken') || null);
    const [loading, setLoading] = useState(true); // always start with loading

    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {

        const userNotAuthenticatedInterceptors = client.interceptors.response.use(response => response, error => {
            // if a request fails with a 403 redirect the user to login form
            if (error.response && error.response.status === 403) {
                setUser(null);
                Cookies.set('bolt-user', "{}");
                navigate('login/', {replace: true, state: {"from": location}});
            }
            return Promise.reject(error);
        });

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
                    client.get('/index/')
                        .then(response => console.log(response))
                        .catch(error => console.log(error.response.status))
                })
                .then(() => {
                    if (loading) setLoading(false);
                })

            return () => {
                client.interceptors.response.eject(userNotAuthenticatedInterceptors);
            };
        }
    }, [loading]);

    return (<AuthContext.Provider value={{user, setUser, csrfToken, setCsrfToken}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};

export default AuthContext;