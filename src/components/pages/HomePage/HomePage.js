import Applications from "./Applications";
import TopMenu from "./TopMenu";
import ActivityLog from "./ActivityLog";
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import {useOutletContext} from "react-router-dom";


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


const HomePage = () => {
    const {appList, actionList, user} = useOutletContext();

    return (<MainContentWrap>
        <Applications appList={appList}/>
        <SideContentWrap>
            <TopMenu user={user}/>
            <ActivityLog actionList={actionList}/>
        </SideContentWrap>
    </MainContentWrap>)
}

export default HomePage;