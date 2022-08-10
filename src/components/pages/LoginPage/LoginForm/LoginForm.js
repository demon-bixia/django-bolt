import { Alert, AlertTitle, Box, Button, Collapse, Paper, Typography } from "@mui/material";
import { styled } from '@mui/system';
import FeatherIcon from "feather-icons-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import AdminLogo from "../../../../assets/logo/AdminLogoLightFilled";
import { fetchCsrfToken, setUser } from "../../../authentication/AuthProvider";
import DynamicField from "../../../forms/fields/DynamicField";

const PaperBackground = styled(Paper)(({ theme }) => ({
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
    },
}));

const Title = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const HelperText = styled(Typography)(({ theme }) => ({
    marginBottom: theme.spacing(5), color: theme.palette.text.secondary,
}));

const FeedBackTitle = styled(AlertTitle)(({ theme }) => ({
    color: theme.palette.error['dark'],
}));

const Form = styled('form')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    ".MuiTextField-root:nth-of-type(1)": {
        marginTop: theme.spacing(5),
    }
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(5),
    padding: theme.spacing(4),
    background: theme.palette.primaryGradient.main,
    borderRadius: "8px",
    boxShadow: theme.shadows[0],
    "&:hover": {
        boxShadow: theme.shadows[0],
    }
}));

const Logo = styled(Box)(({ theme }) => ({
    marginBottom: theme.spacing(7),
}));

const InputComponent = styled(DynamicField)(({ theme }) => ({
    marginBottom: theme.spacing(4),
}));

const LoginForm = ({ status, serializerFields, handleFormSubmit, handleRemoveNonFieldErrors, nonFieldErrors, ...props }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const [responseStatus, setResponseStatus] = useState('');

    return (<PaperBackground elevation={0}>
        <Logo>
            <AdminLogo aria-label="Bolt logo" className='admin-logo' width='50px' height='50px' />
        </Logo>
        <Title variant="h3">Hi Welcome back</Title>
        <HelperText variant="body2">Enter your credentials to continue</HelperText>

        <Collapse in={nonFieldErrors.length > 0} sx={{ width: '100%' }}>
            <Alert
                severity="error"
                icon={<FeatherIcon icon="alert-circle" size={20} />}
                onClose={event => handleRemoveNonFieldErrors()}
            >
                <FeedBackTitle><Typography
                    variant="h6">{responseStatus ? responseStatus : ''}</Typography></FeedBackTitle>
                <Typography
                    variant="body1">{nonFieldErrors ? nonFieldErrors.join('\n') : ''}</Typography>
            </Alert>
        </Collapse>

        <Form onSubmit={event => {
            handleRemoveNonFieldErrors();

            handleFormSubmit(event).then(response => {
                setResponseStatus(response.status);
                if (response.status === 200) {
                    // if successfully authenticated save the user
                    dispatch(setUser(response.data['user']));
                    // refresh csrfToken
                    dispatch(fetchCsrfToken());

                    // then redirect to the route the client came from
                    if (location.state?.from) {
                        navigate(location.state.from);
                    } else {
                        navigate('/', { replace: true });
                    }
                }
            });
        }}>
            {
                serializerFields.map((serializerField) => (
                    <InputComponent
                        key={serializerField.name}
                        serializerField={serializerField}
                        {...props}
                    />
                ))
            }
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
