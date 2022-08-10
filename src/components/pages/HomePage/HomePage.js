import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { selectUser } from "../../authentication/AuthProvider";
import { selectAllActions, selectAllApps } from "../IndexPage";
import ActivityLog from "./ActivityLog";
import Applications from "./Applications";
import TopMenu from "./TopMenu";


const MainContentWrap = styled(Box)(({ theme }) => ({
    display: "flex", marginTop: theme.spacing(2),

    [theme.breakpoints.down('md')]: {
        flexDirection: "column", alignItems: "center",
    },
}));

const SideContentWrap = styled(Box)(({ theme }) => ({
    display: 'flex', flexDirection: "column",

    [theme.breakpoints.down('md')]: {
        width: '100%'
    }
}));


const HomePage = () => {
    const appList = useSelector(selectAllApps);
    const actionList = useSelector(selectAllActions);
    const user = useSelector(selectUser);

    return (<MainContentWrap>
        <Applications appList={appList} />
        <SideContentWrap>
            <TopMenu user={user} />
            <ActivityLog actionList={actionList} />
        </SideContentWrap>
    </MainContentWrap>)
}
/*

*/
export default HomePage;