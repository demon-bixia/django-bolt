import {styled} from "@mui/system";
import Sidebar from "../Sidebar";

const Layout = styled("div")(({theme}) => ({
    padding: theme.spacing(5),
    margin: 0,
    display: "flex",
}));

const IndexPage = () => {
    return (
        <Layout>
            <Sidebar/>
        </Layout>
    );
};

export default IndexPage;
