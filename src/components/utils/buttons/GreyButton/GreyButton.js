import { Button } from "@mui/material";
import { styled } from "@mui/system";

const GreyButton = styled(Button)(({ theme }) => ({
    width: 'auto',
    height: '43px',
    color: theme.palette.grey[300], borderColor: theme.palette.border,
    fontWeight: '400',
    textTransform: 'none',

    '&:hover': {
        backgroundColor: theme.palette.grey[100],
        borderColor: theme.palette.grey[200],
    },
    '&:active': {
        backgroundColor: theme.palette.grey[100],
        borderColor: theme.palette.border,
    },
    '&:focus': {
        backgroundColor: theme.palette.grey[100],
        borderColor: theme.palette.border,
    },
}));

export default GreyButton;
