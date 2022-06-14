import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import FeatherIcon from "feather-icons-react";
import {useTheme} from "@mui/system";
import Typography from "@mui/material/Typography";

const TopMenu = ({user}) => {
    const theme = useTheme();

    return (
        <Stack direction="row" spacing={2}>
            <Button variant="contained" sx={{
                boxShadow: 0,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.grey[300],
                minWidth: '42px',
                minHeight: '42px',
                marginRight: theme.spacing(2),
                padding: theme.spacing(0),
                '&:hover': {backgroundColor: theme.palette.background.paper, boxShadow: 0,}
            }}>
                <FeatherIcon icon={theme.palette.model === "dark" ? "sun" : "moon"} size={16}/>
            </Button>
            <Button variant="contained" sx={{
                boxShadow: 0,
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.grey[300],
                minWidth: '200px',
                justifyContent: 'start',
                '&:hover': {backgroundColor: theme.palette.background.paper, boxShadow: 0,}
            }}>
                <Typography variant="body1"
                            sx={{textTransform: 'none', flexGrow: 1, textAlign: 'start'}}>{user.username}</Typography>
                <FeatherIcon icon='chevron-down' size={12}/>
            </Button>
        </Stack>
    );
};

export default TopMenu;