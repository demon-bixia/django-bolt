import {styled} from "@mui/system";
import Sidebar from "./Sidebar";
import React, {useContext, useEffect, useState} from "react";
import Box from '@mui/material/Box';
import {Outlet} from "react-router-dom";
import Topbar from "./Topbar";
import client from "../../../client";
import AuthContext from "../../contexts/AuthContext";

const Layout = styled(Box)(({theme}) => ({
    padding: theme.spacing(0), display: "flex", boxSizing: 'border-box',
}));

const VerticalWrap = styled(Box)(({theme}) => ({
    display: "flex", flexDirection: "column", flexGrow: 1
}));

const IndexPage = (props) => {
    const [appList, setAppList] = useState([]);
    const [actionList, setActionList] = useState([]);
    const [loading, setLoading] = useState(true);
    const auth = useContext(AuthContext);

    useEffect(() => {
        client.get('/index/')
            .then(response => {
                setAppList(response.data['app_list']);
            })
            .then(() => {
                client.get('/admin_log/')
                    .then(response => setActionList(response.data['action_list']))
                    .catch(error => console.log(error))
            })
            .then(() => {
                if (loading) setLoading(false);
            })
            .catch(error => console.log(error))
    }, [])

    return (
        loading
            ? null
            : <Layout>
                <Sidebar appList={appList}/>
                <VerticalWrap>
                    <Topbar appList={appList}/>
                    <Outlet context={{appList: appList, actionList: actionList, user: auth.user}}/>
                </VerticalWrap>
            </Layout>
    );
};

export default IndexPage;
