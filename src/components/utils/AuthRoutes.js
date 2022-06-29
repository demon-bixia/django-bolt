import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";

const AuthRoutes = () => {
    const auth = useContext(AuthContext);

    if (auth.user)
        return (<Navigate to="/" replace/>);

    return (
        <Outlet/>
    );
};

export default AuthRoutes;

