import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../AuthProvider";

const ProtectedRoutes = () => {
    const location = useLocation();
    const user = useSelector(selectUser);

    if (!user)
        return (<Navigate to="login/" replace state={{ from: location }} />);

    return (
        <Outlet />
    );
};

export default ProtectedRoutes;

