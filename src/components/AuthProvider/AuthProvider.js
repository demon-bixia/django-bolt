import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import { fetchCsrfToken, fetchUser, removeUser, selectStatus } from "./authProvidertSlice";
import { useDispatch, useSelector } from "react-redux";
import client from "../../application/client";
import Cookies from 'js-cookie';

// todo if disconnected show a connection error
const AuthProvider = ({ children }) => {
    const status = useSelector(selectStatus);

    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();


    useEffect(() => {
        // create an interceptor that redirects a user to the login page if the request fails with 403
        const userNotAuthenticatedInterceptors = client.interceptors.response.use(response => response, error => {
            // if a request fails with a 403 redirect the user to login form
            if (error.response && error.response.status === 403) {
                dispatch(removeUser());
                console.log(Cookies.get('bolt-user'));
                navigate('login/', { replace: true, state: { "from": location } });
            }
            return Promise.reject(error);
        });

        if (status === 'idle') {
            // fetch the csrf token and save it
            dispatch(fetchCsrfToken());
            dispatch(fetchUser());

            return () => {
                client.interceptors.response.eject(userNotAuthenticatedInterceptors);
            };
        }
    }, [status]);


    return (<>
        {status === "success" || status === 'failure' ? children : null}
    </>);
};

export default AuthProvider;
