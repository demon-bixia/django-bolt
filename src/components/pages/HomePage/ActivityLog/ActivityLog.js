import FeatherIcon from "feather-icons-react";
import { styled, useTheme } from '@mui/system';
import React from 'react';
import { composeMessage } from './utils';
import moment from "moment";
import { Box, Typography, Paper, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const ActivityBackground = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(5), borderRadius: '16px', minWidth: '350px',
}));

const ActivityHeader = styled(Box)(({ theme }) => ({
    display: 'flex', justifyContent: 'start', alignItems: 'center',
}));

const ViewAllLink = styled(Link)(({ theme }) => ({
    fontWeight: 500,
    color: theme.palette.text.secondary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const Activity = styled(Box)(({ theme }) => ({
    display: 'flex',
    marginBottom: theme.spacing(5),
    maxWidth: '318px'
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    flex: '10%',
    position: 'relative',
}));

const TopConnector = styled(Box)(({ theme, index }) => ({
    width: '1px',
    height: '50%',
    backgroundColor: theme.palette.grey[200],
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 12,
    bottom: '40px',
}));

const BottomConnector = styled(Box)(({ theme }) => ({
    width: '1px',
    height: '50%',
    backgroundColor: theme.palette.grey[200],
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: 0,
    right: 12,
    top: '40px',
}));

const ActivityIcon = styled(Box)(({ theme, index }) => ({
    width: '40px',
    height: '40px',
    borderRadius: '100%',
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: theme.palette.grey[300],
    position: 'relative',
    zIndex: 1000 + index,
    marginRight: theme.spacing(4),
}));

const ActivityLog = ({ actionList }) => {
    const theme = useTheme();

    const actionStyleMapping = {
        1: ['file-plus', theme.palette.success.light, 'added'],
        2: ['edit', theme.palette.info.light, 'changed'],
        3: ['trash-2', theme.palette.error.light, 'deleted']
    }

    return (
        <>
            {
                actionList.length <= 0
                    ? (
                        <ActivityBackground elevation={0}>
                            <ActivityHeader sx={{ marginBottom: theme.spacing(2) }}>
                                <Typography tabIndex={0} sx={{ flexGrow: 1, }} variant="h5">Recent Activity</Typography>
                            </ActivityHeader>
                            <Typography sx={{ color: theme.palette.text.secondary, fontWeight: '300', }}>
                                The Changes in the admin page will appear here.
                            </Typography>
                        </ActivityBackground>
                    )

                    : (
                        <ActivityBackground className="activity-log" elevation={0}>
                            <ActivityHeader tabIndex={0} sx={{ marginBottom: theme.spacing(5) }}>
                                <Typography sx={{ flexGrow: 1, }}
                                    variant="h5">Recent Activity</Typography>
                                {actionList.length > 4
                                    ? (
                                        <ViewAllLink href='#' variant="h6"
                                            underline='none' to="/Activity/" component={RouterLink} aria-label="view all activties">
                                            View all <FeatherIcon icon="arrow-right" size={14} />
                                        </ViewAllLink>
                                    )
                                    : null
                                }
                            </ActivityHeader>

                            {actionList.map((action, index) => (
                                <React.Fragment key={action.id}>
                                    {index <= 4
                                        ? <Box role="list">
                                            <Activity role="listitem">
                                                <IconWrapper sx={{ flexBasis: '10%' }}>
                                                    <TopConnector sx={{ display: index === 0 ? 'none' : 'block' }} />
                                                    <ActivityIcon index={index} sx={{ background: actionStyleMapping[action.action_flag][1], }}>
                                                        <FeatherIcon icon={actionStyleMapping[action.action_flag][0]} />
                                                    </ActivityIcon>
                                                    <BottomConnector sx={{ display: index < 4 ? 'block' : 'none' }} />
                                                </IconWrapper>

                                                <Box sx={{ flexBasis: '90%' }}>
                                                    {composeMessage(action)}
                                                    <Typography variant="body3" component="p"
                                                        sx={{ color: theme.palette.text.secondary }}
                                                    >
                                                        {moment(action.action_time).format('YYYY/MM/DD hh:mm A')}
                                                    </Typography>
                                                </Box>
                                            </Activity>

                                        </Box>
                                        : null
                                    }
                                </React.Fragment>
                            ))}
                        </ActivityBackground>
                    )
            }
        </>
    );
};

export default ActivityLog;