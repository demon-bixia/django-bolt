import Button from '@mui/material/Button';
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import {styled} from '@mui/system';
import FeatherIcon from "feather-icons-react";
import AdminLogo from "../../../assets/logo/admin-logo-filled.svg";
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from '@mui/material/Collapse';
import {useLocation, useNavigate} from "react-router";
import {useContext} from "react";
import SiteContext from "../../contexts/AuthContext";
import Cookies from "js-cookie"

const PaperBackground = styled(Paper)(({theme}) => ({
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(7),
    paddingBottom: theme.spacing(7),
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(6),
    borderRadius: "8px",

    width: "360px",

    [theme.breakpoints.down('sm')]: {
        width: "350px",
    },

    "&::after": {
        content: '""',
        position: "absolute",
        background: theme.palette.primaryGradient.mainHorizontal,
        width: "100%",
        top: "0px",
        height: "8px",
        borderRadius: "8px 8px 0 0",
    }
}));

const Image = styled('img')(({theme}) => ({
    marginBottom: theme.spacing(7),
}));

const Title = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(4),
}));

const HelperText = styled(Typography)(({theme}) => ({
    marginBottom: theme.spacing(5), color: theme.palette.text.secondary,
}));

const FeedBackTitle = styled(AlertTitle)(({theme}) => ({
    color: theme.palette.error['dark'],
}));

const Form = styled('form')(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    ".MuiTextField-root:nth-of-type(1)": {
        marginTop: theme.spacing(5),
    }
}));

const SubmitButton = styled(Button)(({theme}) => ({
    marginTop: theme.spacing(5),
    padding: theme.spacing(4),
    background: theme.palette.primaryGradient.main,
    borderRadius: "8px",
    textTransform: "capitalize",
    boxShadow: theme.shadows[11],
    "&:hover": {
        boxShadow: theme.shadows[0],
    }
}));

function LoginForm({context: {responseError, nonFieldErrors}, formFields, onSubmit, removeNonFieldErrors, ...props}) {
    const navigate = useNavigate();
    const location = useLocation();
    const auth = useContext(SiteContext);

    return (<PaperBackground elevation={7}>
        <Image src={AdminLogo} alt="Bolt logo"/>
        <Title variant="h3">Hi Welcome back</Title>
        <HelperText variant="body2">Enter your credentials to continue</HelperText>
        <Collapse in={nonFieldErrors.length > 0} sx={{width: '100%'}}>
            <Alert
                severity="error"
                icon={<FeatherIcon icon="alert-circle" size={20}/>}
                onClose={event => removeNonFieldErrors()}
            >
                <FeedBackTitle><Typography
                    variant="h6">{responseError ? responseError.response.status : ''}</Typography></FeedBackTitle>
                <Typography
                    variant="body1">{nonFieldErrors ? nonFieldErrors.join('\n') : ''}</Typography>
            </Alert>
        </Collapse>
        <Form onSubmit={event => {
            removeNonFieldErrors();
            onSubmit(event).then(response => {
                if (response.status === 200) {
                    // if successfully authenticated set the user
                    auth.setUser(response.data['user']);
                    Cookies.set('bolt-user', JSON.stringify(response.data['user']))

                    // then redirect to the route the client came from
                    if (location.state?.from) {
                        navigate(location.state.from);
                    } else {
                        navigate('/', {replace: true});
                    }
                }

            });
        }}>
            {formFields}
            <SubmitButton
                type="submit"
                fullWidth
                variant="contained"
                color="primary">
                Login
            </SubmitButton>
        </Form>
    </PaperBackground>);
}

export default LoginForm;
