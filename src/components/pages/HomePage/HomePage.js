import Applications from "./Applications";
import TopMenu from "./TopMenu";
import ActivityLog from "./ActivityLog";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import { useOutletContext } from "react-router-dom";


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
    const { appList, actionList, user } = useOutletContext();

    return (<MainContentWrap>
        <Applications appList={appList} />
        <SideContentWrap>
            <TopMenu user={user} />
            <ActivityLog actionList={actionList}/>
        </SideContentWrap>
    </MainContentWrap>)
}
/*

*/
export default HomePage;