import { styled } from "@mui/system";
import { Button } from "@mui/material";

const WhiteButton = styled(Button)(({ theme }) => ({
    background: theme.palette.background.paper,
    color: theme.palette.grey[300],
    fontWeight: '400',
    height: '35px',
    boxShadow: theme.shadows[0],
    padding: theme.spacing(5),
    borderRadius: '12px',

    '&:hover': {
        background: theme.palette.grey[200],
    },

    '&:active': {
        boxShadow: 'none',
        background: theme.palette.grey[200],
    },
}));

export default WhiteButton;
