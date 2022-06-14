import {styled} from "@mui/system";
import Sidebar from "../Sidebar";
import Applications from "../Applications";
import {useState} from "react";

const Layout = styled("div")(({theme}) => ({
    padding: theme.spacing(5),
    margin: 0,
    display: "flex",
}));

let MOCKAPPDATA = [{
    "name": "Blog", "models": [{"name": "Authors"}, {"name": "Publishers"}, {"name": "Editors"}, {"name": "Posts"}],
}, {
    "name": "Authentication And Authorization", "models": [{"name": "Groups"}, {"name": "Users"}],
}, {
    "name": "Messenger", "models": [{"name": "Conversations"}]
}];

const IndexPage = () => {
    const [appList, setAppList] = useState(MOCKAPPDATA);

    return (
        <Layout>
            <Sidebar appList={appList}/>
            <Applications appList={appList}/>
        </Layout>
    );
};

export default IndexPage;
