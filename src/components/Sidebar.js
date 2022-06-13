import {styled, useTheme} from "@mui/system";
import MuiDrawer from '@mui/material/Drawer';
import FeatherIcon from "feather-icons-react";
import IconButton from '@mui/material/IconButton';
import {useEffect, useState} from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import AdminLogo from "../assets/logo/admin-logo-light-filled.svg"
import Collapse from '@mui/material/Collapse';

const drawerWidth = '240px';

const openedMixin = (theme) => ({
    width: drawerWidth, transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen,
    }), overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen,
    }), overflowX: 'hidden', width: `calc(${theme.spacing(7)} + 1px)`,

    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(10)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(({theme, open}) => ({
    padding: theme.spacing(5, 6), ".MuiDrawer-paper": {
        borderRight: 0, width: drawerWidth,
    }, ...(open && {
        ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme),
    }),

    ...(!open && {
        ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
    }),

}));

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex', alignContent: 'start', padding: theme.spacing(6, 5, 7, 5),
}));

const Logo = styled('div')(() => ({
    flexGrow: 2, '#admin-logo': {
        width: 30, height: 30
    }
}));

const SidebarToggleIcon = styled(FeatherIcon)(() => ({
    strokeWidth: "1.5px",
}));

const SidebarActionList = styled(List)(({theme}) => ({
    margin: theme.spacing(0, 5, 5, 5),

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
        padding: theme.spacing(3, 5, 3, 5), borderRadius: "8px", ".feather": {
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

const SidebarApplicationList = styled(SidebarActionList)(({theme}) => ({
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

let MOCKAPPDATA = [{
    "name": "Blog", "models": [{"name": "Authors"}, {"name": "Publishers"}, {"name": "Editors"}, {"name": "Posts"}],
}, {
    "name": "Authentication And Authorization", "models": [{"name": "Groups"}, {"name": "Users"}],
}, {
    "name": "Messenger", "models": [{"name": "Conversations"}]
}];

const Sidebar = () => {
    const [open, setOpen] = useState(true);
    const [applications, setApplications] = useState(MOCKAPPDATA);
    const [applicationMenuCollapse, setApplicationMenuCollapse] = useState({});
    const theme = useTheme();

    useEffect(() => {
        let collapseList = {};
        for (let application of applications) collapseList[application.name] = false;
        setApplicationMenuCollapse(collapseList);
    }, []);

    const handleToggleCollapse = (app_name) => {
        setApplicationMenuCollapse({
            ...applicationMenuCollapse, [app_name]: !applicationMenuCollapse[app_name]
        });
    };

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (<Drawer variant="permanent" open={open}>
        <DrawerHeader>
            <Logo sx={{display: open ? "initial": "none"}}>
                <img src={AdminLogo} alt="Bolt logo" id="admin-logo"/>
            </Logo>
            <IconButton onClick={handleDrawerToggle}>
                {<SidebarToggleIcon icon={open ? 'chevrons-left' : 'chevrons-right'} size={16}/>}
            </IconButton>
        </DrawerHeader>

        <SidebarActionList subheader={<ListSubheader disableSticky={true}
                                                     sx={{display: open ? 'auto' : 'none'}}>Actions</ListSubheader>}>
            {[{"text": "Home", "icon": "home"}, {
                "text": "View site", "icon": "external-link"
            }, {"text": "Documentation", "icon": "book"}, {
                "text": "activity", "icon": "activity"
            }].map((item, index) => (<ListItem sx={{display: 'block'}} key={index}>
                <ListItemButton sx={{justifyContent: open ? 'start' : 'center'}}>
                    <ListItemIcon sx={{
                        mr: open ? theme.spacing(3) : 'auto',
                        justifyContent: open ? 'start' : 'center'
                    }}><FeatherIcon
                        icon={item.icon}/></ListItemIcon>
                    <ListItemText primary={item.text} sx={{display: open ? "initial" : "none"}}/>
                </ListItemButton>
            </ListItem>))}
        </SidebarActionList>

        <SidebarApplicationList sx={{display: open ? 'auto' : 'none'}}
                                subheader={<ListSubheader disableSticky={true}>Applications</ListSubheader>}>
            {applications.map((app) => (<ListItem sx={{display: 'block'}} key={app.name}>
                <ListItemButton
                    className="main-menu-item" onClick={() => handleToggleCollapse(app.name)}
                    sx={{justifyContent: open ? 'start' : 'center'}}>
                    <ListItemText primary={app.name}/>
                    <FeatherIcon icon={applicationMenuCollapse[app.name] ? "chevron-down" : "chevron-right"}/>
                </ListItemButton>

                {applications ? (<Collapse in={applicationMenuCollapse[app.name]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding sx={{display: open ? 'auto' : 'none'}}>
                        {app.models.map((model) => (<ListItemButton
                            className="sub-menu-item"
                            key={model.name}
                            sx={{pl: 4, justifyContent: open ? 'start' : 'center'}}>
                            <ListItemIcon sx={{mr: open ? theme.spacing(3) : 'auto'}}><span
                                className="dot"></span></ListItemIcon>
                            <ListItemText primary={model.name}/>
                        </ListItemButton>))}
                    </List>
                </Collapse>) : null}
            </ListItem>))}
        </SidebarApplicationList>
    </Drawer>)
};

export default Sidebar;
