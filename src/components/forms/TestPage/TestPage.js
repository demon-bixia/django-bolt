import { useState } from "react";
import { useTheme } from "@mui/system";
import { Box, Button, Paper, Typography, Alert, AlertTitle, Collapse } from "@mui/material";
import DynamicField from "../fields/DynamicField";
import { useParams } from "react-router-dom";
import DynamicForm from "../DynamicForm";

const TestPage = ({ url, ...props }) => {
    const { testName } = useParams();
    return (<DynamicForm url={url ? url : `/test/${testName}/`} FormComponent={TestForm} />);
};

const TestForm = ({ status, serializerFields, handleFormSubmit, nonFieldErrors, handleRemoveNonFieldErrors, ...props }) => {
    const theme = useTheme();
    const [responseStatus, setResponseStatus] = useState('');
    const [message, setMessage] = useState('');

    const handleClose = () => {
        setResponseStatus('')
        handleRemoveNonFieldErrors();
    };

    return (
        <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <form onSubmit={(event) => {
                handleFormSubmit(event)
                    .then(response => {
                        setResponseStatus(response.status);
                        setMessage(response.data.hello);
                    })
                    .catch(error => {
                        setResponseStatus(error.response.status);
                    })
            }}>
                <Paper elevation={7} sx={{ minWidth: '240px', padding: theme.spacing(4), display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h5" sx={{ marginBottom: theme.spacing(6), alignSelf: 'flex-start' }}>
                        Test Form
                    </Typography>

                    <Collapse in={nonFieldErrors.length > 0 || responseStatus === 200} sx={{ width: '220px' }}>
                        <Alert
                            sx={{ marginBottom: theme => theme.spacing(5) }}
                            severity="info"
                            onClose={handleClose}
                        >
                            <AlertTitle>
                                <Typography variant="h6">{responseStatus}</Typography>
                            </AlertTitle>

                            <Typography variant="body1">
                                {nonFieldErrors ? nonFieldErrors.join('\n') : ''}
                                {responseStatus === 200 ? message : ''}
                            </Typography>
                        </Alert>
                    </Collapse>

                    {
                        serializerFields.map((serializerField) => (
                            <DynamicField
                                key={serializerField.name}
                                serializerField={serializerField}
                                {...props}
                                sx={{ marginBottom: theme.spacing(3), width: '100%' }}
                            />
                        ))
                    }

                    <Button variant='outlined' type="submit" sx={{ alignSelf: 'flex-start', marginTop: theme.spacing(4) }}>
                        submit
                    </Button>
                </Paper>
            </form>
        </Box>
    );
}

export default TestPage;
