import { Collapse, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../../authentication/AuthProvider/authProviderSlice";
import config from "../../../../application/config";

const SidebarActionList = styled(List)(({ theme }) => ({
    ".MuiListSubheader-root": {
        color: theme.palette.text['primary'],
        fontWeight: 600,
        lineHeight: "18px",
        fontSize: "12px",
        marginBottom: theme.spacing(3),
        padding: theme.spacing(0, 5),
    },

    ".MuiListItem-root": {
        padding: theme.spacing(0), marginBottom: theme.spacing(3),
    },

    ".MuiListItemButton-root": {
        padding: theme.spacing(3, 5, 3, 5), ".feather": {
            color: theme.palette.grey[300], strokeWidth: "1.5px",
        },
    },

    ".MuiListItemIcon-root": {
        minWidth: "36px",
    },

    ".MuiListItemText-root": {
        color: theme.palette.grey[300],
    },

}))

const SidebarApplicationList = styled(SidebarActionList)(({ theme }) => ({
    ".main-menu-item": {
        marginBottom: theme.spacing(3),
    },

    ".sub-menu-item": {
        padding: theme.spacing(2, 5)
    },

    ".MuiListItemIcon-root": {
        minWidth: "20px",
        marginRight: theme.spacing(3),
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },

    ".dot": {
        width: "4px", height: "4px", borderRadius: "50%", backgroundColor: theme.palette.grey[300],
    },
}));


const DrawerMenu = ({ appList, open, type }) => {
    const [applicationMenuCollapse, setApplicationMenuCollapse] = useState({});
    const dispatch = useDispatch();

    const theme = useTheme();

    useEffect(() => {
        let collapseList = {};
        for (let app of appList) collapseList[app.name] = false;
        setApplicationMenuCollapse(collapseList);
    }, [appList]);

    const handleToggleCollapse = (app_name) => {
        setApplicationMenuCollapse({
            ...applicationMenuCollapse, [app_name]: !applicationMenuCollapse[app_name]
        });
    };

    const handleUserLogout = () => {
        dispatch(logoutUser());
    };

    const conditionalStyle = (desktopValue, mobileValue) => {
        return type !== "mobile" ? desktopValue : mobileValue;
    };

    return (<>
        {/* actions */}
        <SidebarActionList
            sx={{ margin: open ? conditionalStyle(theme.spacing(0, 5, 5, 5), theme.spacing(1)) : theme.spacing(0) }}
            subheader={<ListSubheader
                tabIndex={0}
                aria-label="actions list subheader"
                disableSticky={true}
                sx={{ display: conditionalStyle((open ? 'auto' : 'none'), "auto") }} >Actions</ListSubheader>}>
            {[
                { "text": "HomePage", "icon": "home", "url": '/' },
                { "text": "View site", "icon": "external-link", "url": config.siteUrl, 'type': 'native' },
                { "text": "Documentation", "icon": "book", "url": 'https://github.com/demon-bixia/django-bolt', 'type': 'native' },
                { "text": "Activity", "icon": "activity", "url": '/Activity/' },
                { "text": "Logout", "icon": "log-out", "url": "/", "onClick": handleUserLogout }
            ].map((item, index) => (<ListItem sx={{ display: 'block' }} key={index}>
                <ListItemButton
                    to={item.url}
                    component={item.type === 'native' ? 'a' : RouterLink}
                    sx={{ justifyContent: conditionalStyle((open ? 'start' : 'center'), "start"), borderRadius: open ? '8px' : '0px' }}
                    onClick={item.onClick ? item.onClick : () => { }}
                    aria-label={item.text}
                    {...(item.type === 'native' ? { target: "_blank" } : null)}
                >
                    <ListItemIcon sx={{
                        mr: conditionalStyle((open ? theme.spacing(3) : 'auto'), theme.spacing(3)),
                        justifyContent: conditionalStyle((open ? 'start' : 'center'), "start")
                    }}>
                        <FeatherIcon icon={item.icon} />
                    </ListItemIcon>
                    <ListItemText primary={item.text}
                        sx={{ display: conditionalStyle((open ? "initial" : "none"), "initial") }} />
                </ListItemButton>
            </ListItem>))}
        </SidebarActionList>

        {/* applications */}
        {
            appList.length <= 0 ? null :
                <SidebarApplicationList sx={{
                    display: conditionalStyle((open ? 'auto' : 'none'), 'auto'),
                    margin: conditionalStyle(theme.spacing(0, 5, 5, 5), theme.spacing(1))
                }}
                    subheader={
                        <ListSubheader disableSticky={true} tabIndex={0}
                            aria-label="applications list subheader"
                        >
                            Applications
                        </ListSubheader>
                    }>

                    {appList.map((app, index) => (<ListItem sx={{ display: 'block' }} key={app.name}>
                        <ListItemButton
                            aria-expanded={applicationMenuCollapse[app.name]}
                            id={`button_${index}`}
                            aria-controls={`menu_${index}`}
                            className="main-menu-item"
                            onClick={() => handleToggleCollapse(app.name)}
                            sx={{ justifyContent: conditionalStyle((open ? 'start' : 'center'), 'start') }}
                        >
                            <ListItemText primary={app.name.replace(/_/g, ' ')} />
                            <FeatherIcon
                                icon={applicationMenuCollapse[app.name] ? "chevron-down" : "chevron-right"}
                                size={16}
                            />
                        </ListItemButton>

                        {/* models */}
                        {appList ? (<Collapse id={`menu_${index}`} role="region" aria-labelledby={`button_${index}`} in={applicationMenuCollapse[app.name]} timeout="auto" unmountOnExit>
                            <List
                                component="div"
                                disablePadding
                                sx={{ display: conditionalStyle((open ? 'auto' : 'none'), "auto") }}
                            >
                                {
                                    app['models'].map((model) => (
                                        <ListItemButton
                                            className="sub-menu-item"
                                            key={model.name}
                                            sx={{ pl: 4, justifyContent: conditionalStyle((open ? 'start' : 'center'), "start") }}
                                            component={RouterLink}
                                            to={`/${app.app_label}/${model.name}/changelist/`}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    mr: conditionalStyle((open ? theme.spacing(3) : 'auto'),
                                                        theme.spacing(3))
                                                }}>
                                                <span className="dot"></span>
                                            </ListItemIcon>
                                            <ListItemText primary={model.name} />
                                        </ListItemButton>
                                    ))
                                }
                            </List>
                        </Collapse>) : null}
                    </ListItem>))}
                </SidebarApplicationList>
        }
    </>);
};

export default DrawerMenu;