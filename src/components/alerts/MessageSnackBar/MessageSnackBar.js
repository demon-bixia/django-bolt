import { useTheme } from '@emotion/react';
import MuiAlert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import React from 'react';
import FeatherIcon from "feather-icons-react";

const iconMap = {
    'success': 'check-circle',
    'error': 'x-circle',
};

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const MessageSnackBar = ({ message, open, handleClose, severity }) => {
    const theme = useTheme();

    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert icon={<FeatherIcon icon={iconMap[severity]} />} onClose={handleClose} severity={severity} sx={{ width: '100%', color: theme.palette.success.light }}>
                {message}
            </Alert>
        </Snackbar>
    )
};

export default MessageSnackBar;