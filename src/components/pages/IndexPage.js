import {useTheme} from "@mui/system";
import Sidebar from "../Sidebar";
import Applications from "../Applications";
import ActivityLog from "../ActivityLog";
import {useState} from "react";
import TopMenu from "../TopMenu";
import Box from '@mui/material/Box';

let MOCKAPPDATA = [
    {
        "name": "Blog", "models": [{"name": "Authors"}, {"name": "Publishers"}, {"name": "Editors"}, {"name": "Posts"}],
    }, {
        "name": "Authentication And Authorization", "models": [{"name": "Groups"}, {"name": "Users"}],
    }, {
        "name": "Messenger", "models": [{"name": "Conversations"}]
    }
];

let MockActionData = [
    {
        "id": 1,
        "action_time": "2021-09-14T11:38:26.581543Z",
        "object_repr": "Demonic Emperor",
        "change_message": [{"added": {"name": "author", "object": "Demonic Emperor"}}],
        "user": {'username': 'muhammad'},
        "action": "add",
    },
    {
        "id": 2,
        "action_time": "2022-06-14T17:02:08.618335Z",
        "object_repr": "Sudanese newspaper",
        "change_message": [{"changed": {"name": "publisher", "object": "Sudanese newspaper"}}],
        "user": {'username': 'muhammad'},
        "action": "update",
    },
    {
        "id": 3,
        "action_time": "2022-06-14T17:02:08.618335Z",
        "object_repr": "Sudapost",
        "change_message": [{"added": {"name": "publisher", "object": "Sudapost"}}],
        "user": {'username': 'muhammad'},
        "action": "add",
    },
    {
        "id": 4,
        "action_time": "2022-06-14T17:02:08.618335Z",
        "object_repr": "Smagazine",
        "change_message": [{"delete": {"name": "publisher", "object": "Smagazine"}}],
        "user": {'username': 'muhammad'},
        "action": "delete",
    },
];

let USERMOCKDATA = {'username': 'Muhammad'};

const IndexPage = () => {
    const [appList, setAppList] = useState(MOCKAPPDATA);
    const [actionList, setActionList] = useState(MockActionData)
    const [user, setUser] = useState(USERMOCKDATA);
    const theme = useTheme();

    return (
        <Box sx={{padding: theme.spacing(5), display: "flex",}}>
            <Sidebar appList={appList}/>
            <Box sx={{display: "flex", flexGrow: 1, marginTop: theme.spacing(2)}}>
                <Box sx={{flexGrow: 1}}>
                    <Applications appList={appList}/>
                </Box>
                <Box sx={{display: 'flex', flexDirection: "column"}}>
                    <Box sx={{marginBottom:theme.spacing(6), alignSelf: 'end'}}>
                        <TopMenu user={user}/>
                    </Box>
                    <Box>
                        <ActivityLog actionList={actionList}/>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default IndexPage;
