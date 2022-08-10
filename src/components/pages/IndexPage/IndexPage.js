import Box from '@mui/material/Box';
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchActionList, fetchAppList, selectAllApps, selectStatus } from "./indexPageSlice";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NetworkError from '../../errors/NetworkError';

const Layout = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0), display: "flex",
    boxSizing: 'border-box',
}));

const VerticalWrap = styled(Box)(({ theme }) => ({
    display: "flex", flexDirection: "column", flexGrow: 1,
    margin: theme.spacing(6, 7, 0, 7),
    [theme.breakpoints.down("md")]: {
        margin: theme.spacing(11, 5, 5, 5),
    }
}));

// todo add appbar for desktop.
const IndexPage = (props) => {
    const appList = useSelector(selectAllApps);
    // todo remove top menu from changelist page
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchActionList());
            dispatch(fetchAppList());
        }
    }, []);

    let content;

    switch (status) {
        case "success":
            content = (<Layout >
                <Sidebar appList={appList} />
                <Topbar appList={appList} />
                <VerticalWrap tabIndex='-1' id="mainContent">
                    <Outlet />
                </VerticalWrap>
            </Layout>);
            break;

        case "failure":
            content = (
                <NetworkError />
            )
            break;

        default:
            content = null;
    }

    return (
        <>
            {content}
        </>
    );
};

export default IndexPage;
