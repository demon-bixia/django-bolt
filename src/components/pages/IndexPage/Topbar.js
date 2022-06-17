import AppBar from '@mui/material/AppBar';
import AdminLogo from "../../../assets/logo/admin-logo-light-filled.svg"
import FeatherIcon from "feather-icons-react";
import IconButton from "@mui/material/IconButton";
import {styled} from "@mui/system";
import Box from "@mui/material/Box";
import {Drawer} from "@mui/material";
import {useState} from "react";
import Toolbar from "./Toolbar";

const drawerWidth = '240px';

const Logo = styled(Box)(() => ({
    '.admin-logo': {
        width: 30, height: 30
    }, position: 'absolute', left: '50%', transform: 'translateX(-50%)'
}));

const TopBarWrap = styled(Box)(({theme}) => ({
    [theme.breakpoints.down('md')]: {
        paddingBottom: theme.spacing(10)
    },
}));

const Bar = styled(AppBar)(({theme}) => ({
    background: theme.palette.background.paper,
    padding: theme.spacing(3, 6),
    display: "none",
    position: 'fixed',
    zIndex: 1000,

    [theme.breakpoints.down('md')]: {
        width: '100%', display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: 'flex-start',
    },
}));

const DrawerToggleButton = styled(IconButton)(({theme}) => ({
    flex: '0 1 auto', borderRadius: '12px', border: `1px solid ${theme.palette.border}`, color: theme.palette.grey[300],
}));

const MobileDrawer = styled(Drawer)(({theme}) => ({
    display: 'block', '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
    zIndex: 1500,
    '.MuiDrawer-paper': {
        paddingTop: theme.spacing(5),
    },
    [theme.breakpoints.up('md')]: {
        display: "none",
    }
}));

const Topbar = ({appList}) => {
    const [open, setOpen] = useState(false);

    const handleToggle = () => {
        setOpen(!open);
    };


    return (<TopBarWrap>
        <Bar position="static" elevation={0}>
            <DrawerToggleButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleToggle}
            >
                <FeatherIcon icon="menu" size={12}/>
            </DrawerToggleButton>
            <Logo>
                <img src={AdminLogo} className="admin-logo" alt="admin-logo"/>
            </Logo>
        </Bar>

        <MobileDrawer
            elevation={5}
            open={open} onClose={handleToggle}>
            <Toolbar appList={appList} type="mobile" open={open}/>
        </MobileDrawer>
    </TopBarWrap>);
};

export default Topbar;