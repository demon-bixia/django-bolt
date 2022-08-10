import Link from "@mui/material/Link";
import { styled } from '@mui/system';
import React from 'react';

const ActivityLink = styled(Link)(({ theme }) => ({
    color: theme.palette.text.secondary, display: 'block', maxWidth: '300px',
}));


export const actionNameMapping = {
    1: 'added',
    2: 'changed',
    3: 'deleted',
}

// create a message out of admin log objects
export const composeMessage = (action) => {
    let change_message = action['change_message'];
    let change = change_message[0] || null;

    if (change) {
        if (action['action_flag'] === 1) return (
            <ActivityLink variant="body1"
                href="#"
                underline="none">
                {action['user']['username']} added {change['added']['name']} {action['object_repr']}
            </ActivityLink>
        );

        else if (action['action_flag'] === 2)
            return (
                <ActivityLink variant="body1" href="#" underline="none">
                    {action['user']['username']} changed {change['changed']['fields'].toString()} of {change['changed']['name']} {action['object_repr']}
                </ActivityLink>
            );
    } else
        return (
            <ActivityLink variant="body1" href="#" underline="none">
                {action['user']['username']} {actionNameMapping[action['action_flag']]} {action['object_repr']}
            </ActivityLink>
        );
};