import { Button } from "@mui/material";
import { styled } from "@mui/system";

const ToolbarFilterButton = styled(Button)(({ theme }) => ({
    borderColor: theme.palette.border,
    borderRadius: '12px',

    minWidth: '0',
    width: '49px',
    height: '49px',
    marginLeft: theme.spacing(3),

    // some how this changes the active color
    color: theme.palette.grey[300],

    '&:hover': {
        borderColor: theme.palette.border,
        backgroundColor: theme.palette.grey[100],
    },

    '&:active': {
        backgroundColor: theme.palette.grey[100],
    },

    '&:focus': {
        backgroundColor: theme.palette.grey[100],
    },
}));

export default ToolbarFilterButton;