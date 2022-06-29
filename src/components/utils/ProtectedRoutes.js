import {useLocation, Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import AuthContext from "../contexts/AuthContext";

const ProtectedRoutes = () => {
    const location = useLocation();
    const auth = useContext(AuthContext);

    if (!auth.user)
        return (<Navigate to="login/" replace state={{from: location}}/>);

    return (
        <Outlet/>
    );
};

export default ProtectedRoutes;

