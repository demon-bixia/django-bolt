import DynamicField from "../fields/DynamicField/DynamicField";
import {useEffect, useState} from "react";
import client from "../../client";
import {Box, styled} from "@mui/system";
import Button from '@mui/material/Button';
import moment from "moment";

const FormInput = styled(DynamicField)(({theme}) => ({
    marginBottom: '10px',
}));

const Form = styled("form")(({theme}) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
}));

const DynamicForm = () => {
    const [fields, setFields] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    // independent value to display in DateFields form inputs
    const [dateFieldsInputValues, setDateFieldsInputValues] = useState('');

    useEffect(() => {
        client.get('http://localhost:8000/test/')
            .then((response) => {
                setFields(response.data['fields'])
                let dateFieldValues = {};

                // set default values for every input element.
                let fieldValues = {};
                for (let field of response.data['fields']) {
                    // if it's a DateField or DateTimeField set the default dateFieldInputValue
                    if (field.type === 'DateField') {
                        dateFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(dateFieldValues[field.name]).format('YYYY-MM-DD');
                    } else if (field.type === "DateTimeField") {
                        dateFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(dateFieldValues[field.name]).format('YYYY-MM-DDTHH:mm:ssZ');
                    } else if (field.type === "TimeField") {
                        dateFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(dateFieldValues[field.name]).format('hh:mm:ss');
                    } else if (field.type === "DurationField") {
                        dateFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(dateFieldValues[field.name]).format('DD HH:MM:SS');
                    } else if (typeof field.attrs['current_values'] === "boolean") {
                        fieldValues[field.name] = field.attrs['current_values'];
                    } else if (typeof field.attrs['default'] === "boolean") {
                        fieldValues[field.name] = field.attrs['default'];
                    } else if (typeof field.attrs['initial'] === "boolean") {
                        fieldValues[field.name] = field.attrs['initial'];

                    } else {
                        // set default values for other types
                        fieldValues[field.name] = field.attrs['current_value'] || field.attrs['default'] || field.attrs['initial'] || '';
                    }
                }
                setValues(fieldValues);
                setDateFieldsInputValues(dateFieldValues);
            })
            .catch(error => console.log(error));
    }, []);


    const handleValuesChange = (event, field_name, type = "") => {
        if (type === "checkbox") {
            setValues({...values, [field_name]: event.target.checked});
        } else if (["datePicker", "dateTimePicker", "timePicker"].includes(type)) {
            setDateFieldsInputValues({...dateFieldsInputValues, [field_name]: event['default']}); // value to display in input
            setValues({...values, [field_name]: event['formatted']}); // value sent to server
            console.log(event['formatted']);
        } else {
            setValues({...values, [field_name]: event.target.value});
        }
    };

    const handleRemoveErrors = (event, field_name) => {
        if (errors[field_name])
            setErrors({...errors, [field_name]: ''});
    }

    const handleFormSubmit = event => {
        event.preventDefault();
        client.post('http://localhost:8000/test/', {...values})
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error.response.data);
                if (error.response.data) {
                    let errors = {};
                    for (let [key, value] of Object.entries(error.response.data)) {
                        errors[key] = value;
                    }
                    setErrors(errors);
                    console.log(errors);
                }
            });
    };

    // populate the fields state variable with DynamicField's
    const formFields = fields
        ? fields.map((field, index) => {
            if (['DateField', 'DateTimeField', 'TimeField', 'DurationField'].includes(field.type))
                return (<FormInput
                    key={index}
                    field={field}
                    value={values[field.name]}
                    dateInputValue={dateFieldsInputValues[field.name]}
                    errors={errors[field.name]}
                    onChange={handleValuesChange}
                    onClick={handleRemoveErrors}/>);
            else
                return (<FormInput
                    key={index}
                    field={field}
                    value={values[field.name]}
                    errors={errors[field.name]}
                    onChange={handleValuesChange}
                    onClick={handleRemoveErrors}/>);
        }) : [];

    return (
        <Box sx={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
            <Form onSubmit={handleFormSubmit}>
                {formFields}
                <Button variant="contained" type="submit">Submit</Button>
            </Form>
        </Box>
    );
};

export default DynamicForm;