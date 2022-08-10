import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import client from "../../../application/client";
import { fetchCsrfToken, fetchUser, removeUser, selectStatus, setStatus } from "./authProviderSlice";

const AuthProvider = ({ children }) => {
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // a response interceptor that redirects a user to the login page if the request fails with 403
        const userNotAuthenticatedInterceptors = client.interceptors.response.use(response => response, error => {
            if (error.response && error.response.status === 403) {
                dispatch(removeUser());
                navigate('login/', { replace: true, state: { "from": location } });
            }
            return Promise.reject(error);
        });

        // fetch information about the current session
        dispatch(fetchUser());
        dispatch(fetchCsrfToken());

        return () => {
            client.interceptors.response.eject(userNotAuthenticatedInterceptors);
        };
    }, []);


    return (<>
        {status === "success" || status === 'failure' ? children : null}
    </>);
};

export default AuthProvider;
