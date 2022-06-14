import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import FeatherIcon from "feather-icons-react";
import {styled, useTheme} from '@mui/system';

const ContentWrap = styled(Box)(({theme}) => ({
    '&::before ': {
        position: 'absolute',
        top: "calc(110% - 1px)",
        left: "calc(80% - 13px)",
        content: '""',
        backgroundColor: theme.palette.grey[200],
        height: "10px",
        width: '1px',
    },
}));

const ActivityLog = ({actionList}) => {
    const theme = useTheme();

    const actionStyleMapping = {
        'add': ['file-plus', theme.palette.success.light],
        'update': ['edit', theme.palette.info.light],
        'delete': ['trash-2', theme.palette.error.light]
    }

    return (<Box>
        <Paper className="activity-log" elevation={0}
               sx={{padding: theme.spacing(5, 5, 2, 5), borderRadius: '16px'}}>
            <Box sx={{
                minWidth: '300px',
                marginBottom: theme.spacing(5),
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                marginRight: theme.spacing(5)
            }}>
                <Typography sx={{flexGrow: 1,}} variant="h5">Recent Activity</Typography>
                <Link href='#' variant="h6" underline='none'
                      sx={{
                          fontWeight: 500,
                          color: theme.palette.text.secondary,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                      }}>
                    View all <FeatherIcon icon="arrow-right" size={14}/>
                </Link>
            </Box>
            {actionList.map((action, index) => (
                <Box key={action.id} sx={{display: 'flex', marginBottom: theme.spacing(5),}}>
                    <Box sx={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '100%',
                        background: actionStyleMapping[action.action][1],
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: theme.palette.grey[300],
                        marginRight: theme.spacing(4),
                        position: "relative",
                    }}>
                        <FeatherIcon icon={actionStyleMapping[action.action][0]}/>
                        {index + 1 >= actionList.length ? null : <ContentWrap/>}
                    </Box>
                    <Box>
                        <Link variant="body1" href="#" underline="none" sx={{color: theme.palette.text.primary,}}>Add
                            new user Muhammad Salah</Link>
                        <Typography variant="body3" component="p" sx={{color: theme.palette.text.secondary}}>28-12-2022
                            12:20 pm</Typography>
                    </Box>
                </Box>))}
        </Paper>
    </Box>);
};

export default ActivityLog;