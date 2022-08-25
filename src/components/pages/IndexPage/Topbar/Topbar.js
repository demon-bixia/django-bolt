import { AppBar, Box, Button, Drawer, IconButton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import AdminLogo from "../../../../assets/logo/admin-logo-filled-light.png";
import DrawerMenu from "../DrawerMenu";


const drawerWidth = '240px';

const Logo = styled(Box)(({ theme }) => ({
    position: 'absolute', left: '50%', transform: 'translateX(-50%)',

    '.admin-logo': {
        width: 30, height: 30
    },

    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

const Bar = styled(AppBar)(({ theme }) => ({
    background: theme.palette.background.paper,
    boxSizing: 'padding-box',
    height: '53px',
    display: 'flex',
    padding: theme.spacing(3, 5),
    zIndex: 1000,

    flexDirection: "row",
    justifyContent: 'flex-start',
    alignItems: 'center',

    [theme.breakpoints.up('md')]: {
        display: 'none'
    },
}));

const DrawerToggleButton = styled(IconButton)(({ theme }) => ({
    flex: '0 1 auto', borderRadius: '12px', border: `1px solid ${theme.palette.border}`, color: theme.palette.grey[300],
    margin: 0,
}));

const MobileDrawer = styled(Drawer)(({ theme }) => ({
    display: 'block', '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
    zIndex: 1500,

    '.MuiDrawer-paper': {
        paddingTop: theme.spacing(5),
    },

    [theme.breakpoints.up('md')]: {
        display: "none",
    }
}));

const Topbar = ({ appList }) => {
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleToggle = () => {
        setOpen(!open);
    };

    return (<Box>
        <Bar position="sticky" elevation={0}>
            <Box sx={{ flexGrow: 1 }}>
                <DrawerToggleButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleToggle}
                >
                    <FeatherIcon icon="menu" size={12} />
                </DrawerToggleButton>
            </Box>

            <Logo>
                <img src={AdminLogo} aria-label="Bolt logo" className="admin-logo" />
            </Logo>

        </Bar>

        <MobileDrawer
            elevation={5}
            open={open} onClose={handleToggle}>
            <DrawerMenu appList={appList} type="mobile" open={open} />
        </MobileDrawer>
    </Box>);
};

export default Topbar;