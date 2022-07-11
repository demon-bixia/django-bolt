import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import FeatherIcon from "feather-icons-react";
import {styled, useTheme} from "@mui/system";
import Typography from "@mui/material/Typography";
import MenuList from '@mui/material/MenuList';
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from "@mui/material/Menu";
import {useState} from "react";

const TopMenuWrap = styled(Stack)(({theme}) => ({
    marginBottom: theme.spacing(6), alignSelf: 'end'
}));

const AccountActionsMenuButton = styled(Button)(({theme}) => ({
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.grey[300],
    minWidth: '200px',
    justifyContent: 'start',
    '&:hover': {backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[0],}
}));

const NightModeButton = styled(Button)(({theme}) => ({
    boxShadow: theme.shadows[0],
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.grey[300],
    minWidth: '42px',
    minHeight: '42px',
    marginRight: theme.spacing(2),
    padding: theme.spacing(0),
    '&:hover': {backgroundColor: theme.palette.background.paper, boxShadow: theme.shadows[0],}
}));

const TopMenu = ({user}) => {
    const theme = useTheme();
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);

    const handleCloseMenu = () => {
        setAnchor(null);
    };

    const handleOpenMenu = (event) => {
        setAnchor(event.currentTarget);
    };

    return (<TopMenuWrap direction="row" spacing={2}>
        <NightModeButton variant="contained" aria-label="switch theme">
            <FeatherIcon icon={theme.palette.mode === "dark" ? "sun" : "moon"} size={16}/>
        </NightModeButton>
        <AccountActionsMenuButton variant="contained" onClick={handleOpenMenu}
         aria-expanded={open} aria-controls="account_switcher_action_list" id="account_switcher"
         aria-label="account switcher"
        >
            <Typography variant="body1"
                        sx={{textTransform: 'none', flexGrow: 1, textAlign: 'start'}}>{user.email}</Typography>
            <FeatherIcon icon='chevron-down' size={12}/>
        </AccountActionsMenuButton>

        <Menu open={open} onClose={handleCloseMenu} anchorEl={anchor} anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}>
            <MenuList role="list"  id="account_switcher_action_list" aria-labelledby="account_switcher">
                <MenuItem aria-label="logout" role="button">
                    <ListItemIcon >
                        <FeatherIcon icon="log-out"/>
                    </ListItemIcon>
                    <ListItemText>logout</ListItemText>
                </MenuItem>
            </MenuList>
        </Menu>
    </TopMenuWrap>);
};

export default TopMenu;