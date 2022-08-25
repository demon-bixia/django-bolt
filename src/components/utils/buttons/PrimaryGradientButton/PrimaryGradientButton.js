import {styled} from "@mui/system";
import {Button} from "@mui/material";

const PrimaryGradientButton = styled(Button)(({theme}) => ({
    background: theme.palette.primaryGradient.main,
    height: '35px',
    boxShadow: theme.shadows[0],
    padding: theme.spacing(5),
    borderRadius: '12px',
}));


export default PrimaryGradientButton;