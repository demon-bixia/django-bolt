import DynamicForm from "./forms/DynamicForm";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Form = ({context: {responseError, nonFieldErrors}, formFields, onSubmit, removeNonFieldErrors, ...props}) => {
    return (
        <form onSubmit={onSubmit}>
            <Box sx={{
                'width': '100%',
                'height': '100vh',
                'display': 'flex',
                'justifyContent': 'center',
                'alignItems': 'center',
                'flexDirection': 'column'
            }}>
                {formFields[0]}
                <Button variant="contained" type="submit" sx={{maxWidth: 'auto', minWidth: '100%'}}>
                    Submit
                </Button>
            </Box>
        </form>

    );
};

const TestForm = () => {

    return (
        <Box sx={{
            'width': '100%',
            'height': '100vh',
            'display': 'flex',
            'justifyContent': 'center',
            'alignItems': 'center'
        }}>
            <DynamicForm formUrl="/test/" FormComponent={Form}/>
        </Box>
    );
};

export default TestForm;
