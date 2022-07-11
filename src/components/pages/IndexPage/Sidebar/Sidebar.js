import { styled } from "@mui/system";
import MuiDrawer from '@mui/material/Drawer';
import FeatherIcon from "feather-icons-react";
import IconButton from '@mui/material/IconButton';
import { useState } from "react";
import AdminLogo from "../../../../assets/logo/AdminLogoLightFilled"
import Toolbar from "../Toolbar";

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

    [theme.breakpoints.up('md')]: {
        width: `calc(${theme.spacing(10)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    padding: theme.spacing(5, 6), ".MuiDrawer-paper": {
        borderRight: 0, width: drawerWidth,
    }, ...(open && {
        ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme),
    }),

    ...(!open && {
        ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme),
    }),

}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex', alignContent: 'start', padding: theme.spacing(6, 5, 7, 5),
}));

const Logo = styled('div')(() => ({
    flexGrow: 2,
}));

const SidebarToggleIcon = styled(FeatherIcon)(() => ({
    strokeWidth: "1.5px",
}));


// todo add skip to main content 
const Sidebar = ({ appList }) => {
    const [open, setOpen] = useState(true);

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (<>
        <Drawer variant="permanent" open={open} sx={{ display: { xs: 'none', md: 'block' }, }}>
            <DrawerHeader>
                <Logo sx={{ display: open ? "initial" : "none" }} tabIndex={1}>
                    <AdminLogo aria-label="Bolt logo" width='30px' height='30px' />
                </Logo>
                <IconButton onClick={handleDrawerToggle} aria-label="toggle-drawer-menu ">
                    {<SidebarToggleIcon icon={open ? 'chevrons-left' : 'chevrons-right'} size={16} />}
                </IconButton>
            </DrawerHeader>
            <Toolbar appList={appList} open={open} />
        </Drawer>
    </>);
};

export default Sidebar;
