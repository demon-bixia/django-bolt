import Box from '@mui/material/Box';
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import FeatherIcon from "feather-icons-react";
import {styled, useTheme} from '@mui/system';


const ActivityBackground = styled(Paper)(({theme}) => ({
    padding: theme.spacing(5), borderRadius: '16px', minWidth: '350px',
}));

const ActivityHeader = styled(Box)(({theme}) => ({
    display: 'flex', justifyContent: 'start', alignItems: 'center',
}));

const ViewAllLink = styled(Link)(({theme}) => ({
    fontWeight: 500,
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const Activity = styled(Box)(({theme}) => ({
    display: 'flex', marginBottom: theme.spacing(2)
}));

const ActivityIcon = styled(Box)(({theme}) => ({
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey[300],
    marginRight: theme.spacing(4),
}));

const ActivityLink = styled(Link)(({theme}) => ({
    color: theme.palette.text.secondary, display: 'block', maxWidth: '300px',
}));

const ConnectingLineContainer = styled(Box)(({theme}) => ({
    display: 'flex', marginBottom: theme.spacing(2), minHeight: '10px', height: '100%',
}));

const ConnectingLineIconMirror = styled(Box)(({theme}) => ({
    width: '40px', display: "flex", justifyContent: "center", alignItems: "center", position: 'relative',
}));

const ConnectingLineTextMirror = styled(Box)(({theme}) => ({
    flexGrow: 1,
}));

const ConnectingLine = styled(Box)(({theme}) => ({
    height: '100%', width: '1px', backgroundColor: theme.palette.grey[200], position: 'absolute',
}));


const ActivityLog = ({actionList}) => {
    const theme = useTheme();

    const actionStyleMapping = {
        1: ['file-plus', theme.palette.success.light, 'added'],
        2: ['edit', theme.palette.info.light, 'changed'],
        3: ['trash-2', theme.palette.error.light, 'deleted']
    }

    const compose_message = (action) => {
        let change_message = action['change_message'];
        let change = change_message[0] || null;

        if (change) {
            if (action['action_flag'] === 1) return (<ActivityLink variant="body1"
                                                                   href="#"
                                                                   underline="none">
                {action['user']['username']} added {change['added']['name']} {action['object_repr']}
            </ActivityLink>); else if (action['action_flag'] === 2) return (
                <ActivityLink variant="body1" href="#" underline="none">
                    {action['user']['username']} changed {change['changed']['fields'].toString()} of {change['changed']['name']} {action['object_repr']}
                </ActivityLink>);
        } else return (<ActivityLink variant="body1" href="#" underline="none">
            {action['user']['username']} {actionStyleMapping[action['action_flag']][2]} {action['object_repr']}
        </ActivityLink>);
    };

    // todo split empty state
    return (
        <>
            {
                actionList.length <= 0
                    ? (
                        <ActivityBackground>
                            <ActivityHeader sx={{marginBottom: theme.spacing(2)}}>
                                <Typography sx={{flexGrow: 1,}} variant="h5">Recent Activity</Typography>
                            </ActivityHeader>
                            <Typography sx={{color: theme.palette.text.secondary, fontWeight: '300',}}>
                                The Changes in the admin page will appear here.
                            </Typography>
                        </ActivityBackground>
                    )

                    : (
                        <ActivityBackground className="activity-log" elevation={0}>
                            <ActivityHeader sx={{marginBottom: theme.spacing(5)}}>
                                <Typography sx={{flexGrow: 1,}}
                                            variant="h5">Recent Activity</Typography>
                                {actionList.length > 5
                                    ? (
                                        <ViewAllLink href='#' variant="h6"
                                                     underline='none'>
                                            View all <FeatherIcon icon="arrow-right" size={14}/>
                                        </ViewAllLink>
                                    )
                                    : null
                                }
                            </ActivityHeader>
                            {actionList.map((action, index) => (<Box key={action.id}>
                                <Activity>
                                    <ActivityIcon sx={{background: actionStyleMapping[action.action_flag][1],}}>
                                        <FeatherIcon icon={actionStyleMapping[action.action_flag][0]}/>
                                    </ActivityIcon>
                                    <div>
                                        {compose_message(action)}
                                        <Typography variant="body3" component="p"
                                                    sx={{color: theme.palette.text.secondary}}>28-12-2022
                                            12:20 pm</Typography>
                                    </div>
                                </Activity>

                                {index + 1 >= actionList.length ? null : <ConnectingLineContainer>
                                    <ConnectingLineIconMirror><ConnectingLine/></ConnectingLineIconMirror>
                                    <ConnectingLineTextMirror/>
                                </ConnectingLineContainer>}
                            </Box>))}
                        </ActivityBackground>
                    )
            }
        </>
    );
};

export default ActivityLog;