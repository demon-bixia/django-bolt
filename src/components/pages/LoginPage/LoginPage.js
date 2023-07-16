import { styled } from "@mui/system";
import DynamicForm from "../../forms/DynamicForm";
import LoginForm from "./LoginForm";

const Layout = styled("div")(({ theme }) => ({
    height: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "0",
    padding: theme.spacing(5),
    background: theme.palette.grey['100'],
}));

const LoginPage = () => {

    return (
        <Layout component="main">
            <DynamicForm url='/login/' FormComponent={LoginForm} wrap={false} />
        </Layout>
    );
};

export default LoginPage;
