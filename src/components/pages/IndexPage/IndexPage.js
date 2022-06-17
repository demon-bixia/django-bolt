import {styled} from "@mui/system";
import Sidebar from "./Sidebar";
import Applications from "./Applications";
import ActivityLog from "./ActivityLog";
import {useState} from "react";
import TopMenu from "./TopMenu";
import Box from '@mui/material/Box';
import Topbar from "./Topbar";

const Layout = styled(Box)(({theme}) => ({
    padding: theme.spacing(0), display: "flex", boxSizing: 'border-box',
}));

const VerticalWrap = styled(Box)(({theme}) => ({
    display: "flex", flexDirection: "column", flexGrow: 1
}));

const MainContentWrap = styled(Box)(({theme}) => ({
    display: "flex", marginTop: theme.spacing(2), padding: theme.spacing(5, 5, 5, 0),

    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(5), flexDirection: "column", alignItems: "center",
    },
}));

const SideContentWrap = styled(Box)(({theme}) => ({
    display: 'flex', flexDirection: "column",

    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));

let MOCKAPPDATA = [{
    "name": "Blog", "models": [{"name": "Authors"}, {"name": "Publishers"}, {"name": "Editors"}, {"name": "Posts"}],
}, {
    "name": "Authentication And Authorization", "models": [{"name": "Groups"}, {"name": "Users"}],
}, {
    "name": "Messenger", "models": [{"name": "Conversations"}]
}];

let MockActionData = [{
    "id": 1,
    "action_time": "2021-09-14T11:38:26.581543Z",
    "object_repr": "Demonic Emperor",
    "change_message": [{"added": {"name": "author", "object": "Demonic Emperor"}}],
    "user": {'username': 'muhammad'},
    "action": "add",
}, {
    "id": 2,
    "action_time": "2022-06-14T17:02:08.618335Z",
    "object_repr": "Sudanese newspaper",
    "change_message": [{"changed": {"name": "publisher", "object": "Sudanese newspaper"}}],
    "user": {'username': 'muhammad'},
    "action": "update",
}, {
    "id": 3,
    "action_time": "2022-06-14T17:02:08.618335Z",
    "object_repr": "Sudapost",
    "change_message": [{"added": {"name": "publisher", "object": "Sudapost"}}],
    "user": {'username': 'muhammad'},
    "action": "add",
}, {
    "id": 4,
    "action_time": "2022-06-14T17:02:08.618335Z",
    "object_repr": "Smagazine",
    "change_message": [{"delete": {"name": "publisher", "object": "Smagazine"}}],
    "user": {'username': 'muhammad'},
    "action": "delete",
},];

let USERMOCKDATA = {'username': 'Muhammad'};

const IndexPage = () => {
    const [appList, setAppList] = useState(MOCKAPPDATA);
    const [actionList, setActionList] = useState(MockActionData)
    const [user, setUser] = useState(USERMOCKDATA);

    return (<Layout>
        <Sidebar appList={appList}/>
        <VerticalWrap>
            <Topbar appList={appList}/>
            <MainContentWrap>
                <Applications appList={appList}/>
                <SideContentWrap>
                    <TopMenu user={user}/>
                    <ActivityLog actionList={actionList}/>
                </SideContentWrap>
            </MainContentWrap>
        </VerticalWrap>
    </Layout>);
};

export default IndexPage;
