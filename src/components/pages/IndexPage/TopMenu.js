import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import FeatherIcon from "feather-icons-react";
import {styled, useTheme} from "@mui/system";
import Typography from "@mui/material/Typography";

const TopMenuWrapper = styled(Stack)(({theme}) => ({
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

    return (<TopMenuWrapper direction="row" spacing={2}>
        <NightModeButton variant="contained">
            <FeatherIcon icon={theme.palette.mode === "dark" ? "sun" : "moon"} size={16}/>
        </NightModeButton>
        <AccountActionsMenuButton variant="contained">
            <Typography variant="body1"
                        sx={{textTransform: 'none', flexGrow: 1, textAlign: 'start'}}>{user.username}</Typography>
            <FeatherIcon icon='chevron-down' size={12}/>
        </AccountActionsMenuButton>
    </TopMenuWrapper>);
};

export default TopMenu;