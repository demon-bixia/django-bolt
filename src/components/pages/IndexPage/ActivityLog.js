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

const ActivityBackground = styled(Paper)(({theme}) => ({
    padding: theme.spacing(5, 5, 2, 5),
    borderRadius: '16px'
}));

const ActivityHeader = styled(Box)(({theme}) => ({
    minWidth: '300px',
    marginBottom: theme.spacing(5),
    display: 'flex',
    justifyContent: 'start',
    alignItems: 'center',
    marginRight: theme.spacing(5)
}));

const ViewAllLink = styled(Link)(({theme}) => ({
    fontWeight: 500,
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const Activity = styled(Box)(({theme}) => ({
    display: 'flex', marginBottom: theme.spacing(5)
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
    position: "relative",

}));

const ActivityLink = styled(Link)(({theme}) => ({
    color: theme.palette.text.secondary
}));

const ActivityLog = ({actionList}) => {
    const theme = useTheme();

    const actionStyleMapping = {
        'add': ['file-plus', theme.palette.success.light],
        'update': ['edit', theme.palette.info.light],
        'delete': ['trash-2', theme.palette.error.light]
    }

    return (
        <ActivityBackground className="activity-log" elevation={0}>
            <ActivityHeader>
                <Typography sx={{flexGrow: 1,}} variant="h5">Recent Activity</Typography>
                <ViewAllLink href='django-bolt/src/components/pages/IndexPage/ActivityLog#' variant="h6"
                             underline='none'>
                    View all <FeatherIcon icon="arrow-right" size={14}/>
                </ViewAllLink>
            </ActivityHeader>
            {actionList.map((action, index) => (
                <Activity key={action.id}>
                    <ActivityIcon sx={{background: actionStyleMapping[action.action][1],}}>
                        <FeatherIcon icon={actionStyleMapping[action.action][0]}/>
                        {index + 1 >= actionList.length ? null : <ContentWrap/>}
                    </ActivityIcon>
                    <div>
                        <ActivityLink variant="body1" href="django-bolt/src/components/pages/IndexPage/ActivityLog#"
                                      underline="none">
                            Add new user Muhammad Salah</ActivityLink>
                        <Typography variant="body3" component="p" sx={{color: theme.palette.text.secondary}}>28-12-2022
                            12:20 pm</Typography>
                    </div>
                </Activity>))}
        </ActivityBackground>);
};

export default ActivityLog;