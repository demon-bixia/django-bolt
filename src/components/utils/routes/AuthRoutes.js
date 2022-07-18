import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../AuthProvider";

const AuthRoutes = () => {
    const user = useSelector(selectUser);

    if (user) {
        return (<Navigate to="/" replace />);
    }

    return (
        <Outlet />
    );
};

export default AuthRoutes;

