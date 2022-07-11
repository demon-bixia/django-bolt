import Box from '@mui/material/Box';
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { selectUser } from "../../AuthProvider/authProvidertSlice";
import { fetchActionList, fetchAppList, selectAllActions, selectAllApps, selectStatus } from "./indexPageSlice";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0), display: "flex", boxSizing: 'border-box',
}));

const VerticalWrap = styled(Box)(({ theme }) => ({
    display: "flex", flexDirection: "column", flexGrow: 1,
    margin: theme.spacing(6, 7, 0, 7),

    [theme.breakpoints.down("md")]: {
        margin: theme.spacing(11, 5, 5, 5),
    }
}));

const IndexPage = (props) => {
    const appList = useSelector(selectAllApps);
    const actionList = useSelector(selectAllActions);
    const status = useSelector(selectStatus);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchActionList());
            dispatch(fetchAppList());
        }
    }, []);


    return (
        status === 'success' || status === 'failure'
            ? <Layout>
                <Sidebar appList={appList} />
                <Topbar appList={appList} />
                <VerticalWrap>
                    <Outlet context={{ appList: appList, actionList: actionList, user: user }} />
                </VerticalWrap>
            </Layout>
            : null
    );
};

export default IndexPage;
