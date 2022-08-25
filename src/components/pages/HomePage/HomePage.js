import Box from "@mui/material/Box";
import { styled } from "@mui/system";
import { useSelector } from "react-redux";
import { selectAllActions, selectAllApps } from "../IndexPage";
import ActivityLog from "./ActivityLog";
import Applications from "./Applications";


const MainContentWrap = styled(Box)(({ theme }) => ({
    display: "flex",

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

    return (<MainContentWrap>
        <Applications appList={appList} />
        <SideContentWrap>
            <ActivityLog actionList={actionList} />
        </SideContentWrap>
    </MainContentWrap>)
}
/*

*/
export default HomePage;