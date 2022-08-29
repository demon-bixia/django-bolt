import { Typography } from "@mui/material";

const MessageRenderer = ({ value }) => {
    return (
        <Typography
            variant="body2"
            sx={{ color: theme => theme.palette.text.primary }}
        >
            {value}
        </Typography>
    );
};

export default MessageRenderer;