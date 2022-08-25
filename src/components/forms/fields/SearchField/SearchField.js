import TextField from '@mui/material/TextField';
import { styled } from "@mui/system";

const SearchField = styled(TextField)(({ theme }) => ({
    color: theme.palette.text.secondary,
    borderRadius: '12px',

    [theme.breakpoints.down("md")]: {
        flexGrow: 1,
        '& .MuiOutlinedInput-root': {
            width: '100%',
        }
    },

    '& label.Mui-focused': {
        color: theme.palette.text.secondary,
    },

    '& .MuiOutlinedInput-root': {
        height: '49px',

        '& fieldset': {
            borderColor: theme.palette.border,
        },
        '&:hover fieldset': {
            borderColor: theme.palette.border,
        },
        '&.Mui-focused fieldset': {
            borderColor: theme.palette.border,
        },
    },
}));

export default SearchField;