import Box from '@mui/material/Box';
import { styled } from "@mui/system";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { fetchActionList, fetchAppList, selectAllApps, selectStatus, resetIndexPage } from "./indexPageSlice";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NetworkError from '../../errors/NetworkError';

const Layout = styled(Box)(({ theme }) => ({
    padding: theme.spacing(0), display: "flex", boxSizing: 'border-box',
}));

const VerticalWrap = styled(Box)(({ theme }) => ({
    display: "flex", flexDirection: "column", flexGrow: 1, margin: 0,
    minWidth: '1px',
}));

const ContentWrap = styled(Box)(({ theme }) => ({
    display: "flex", flexDirection: "column", flexGrow: 1, margin: theme.spacing(7, 7, 7, 7),
    overflowY: 'scroll',
    [theme.breakpoints.down("md")]: {
        margin: theme.spacing(7, 5, 7, 5),
    }
}));

const IndexPage = (props) => {
    const appList = useSelector(selectAllApps);
    const status = useSelector(selectStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchActionList());
            dispatch(fetchAppList());
        }

        return () => {
            dispatch(resetIndexPage());
        };
    }, []);

    let content;

    switch (status) {
        case "success":
            content = (<Layout>
                <Sidebar appList={appList} />
                <VerticalWrap>
                    <Topbar appList={appList} />

                    <ContentWrap tabIndex='-1' id="mainContent">
                        <Outlet />
                    </ContentWrap>
                </VerticalWrap>
            </Layout>);
            break;

        case "failure":
            content = (<NetworkError />)
            break;

        default:
            content = null;
    }

    return (<>
        {content}
    </>);
};

export default IndexPage;
