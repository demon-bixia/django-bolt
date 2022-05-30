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
    display: "flex", flexDirection: "column", justifyContent: "center",
}));

const DynamicForm = () => {
    const [fields, setFields] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    // independent value to display in DateFields form inputs
    const [fieldsInputValues, setFieldsInputValues] = useState('');
    const [contentType, setContentType] = useState('application/json');

    useEffect(() => {
        client.get('http://localhost:8000/test/')
            .then((response) => {
                setFields(response.data['fields'])
                let displayFieldValues = {};

                // set default values for every input element.
                let fieldValues = {};
                for (let field of response.data['fields']) {
                    // if it's a DateField or DateTimeField set the default dateFieldInputValue
                    if (field.type === 'DateField') {
                        displayFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(displayFieldValues[field.name]).format('YYYY-MM-DD');
                    } else if (field.type === "DateTimeField") {
                        displayFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(displayFieldValues[field.name]).format('YYYY-MM-DDTHH:mm:ssZ');
                    } else if (field.type === "TimeField") {
                        displayFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(displayFieldValues[field.name]).format('hh:mm:ss');
                    } else if (field.type === "DurationField") {
                        displayFieldValues[field.name] = field.attrs['default'] || field.attrs['initial'] || '';
                        fieldValues[field.name] = moment(displayFieldValues[field.name]).format('DD HH:MM:SS');
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

                    // if the field is a FileField or an ImageField set contentType to multipart/form-data
                    if (['FileField', 'ImageField'].includes(field.type)) {
                        setContentType('multipart/form-data');
                    }
                }
                setValues(fieldValues);
                setFieldsInputValues(displayFieldValues);
            })
            .catch(error => console.log(error));
    }, []);


    const handleValuesChange = (event, field_name, type = "") => {
        if (type === "checkbox") {
            setValues({...values, [field_name]: event.target.checked});
        } else if (["datePicker", "dateTimePicker", "timePicker"].includes(type)) {
            setFieldsInputValues({...fieldsInputValues, [field_name]: event['default']}); // value to display in input
            setValues({...values, [field_name]: event['formatted']}); // value sent to server
        } else if (type === "fileUpload") {
            setFieldsInputValues({
                ...fieldsInputValues, [field_name]: event['file'] ? event['file']['name'] : ''
            })
            setValues({...values, [field_name]: event['file']})
        } else {
            setValues({...values, [field_name]: event.target.value});
        }
    };

    const handleRemoveErrors = (event, field_name) => {
        if (errors[field_name]) setErrors({...errors, [field_name]: ''});
    }

    const handleFormSubmit = event => {
        event.preventDefault();

        let data;
        if (contentType === "multipart/form-data") {
            data = new FormData();
            for (let [key, value] of Object.entries(values)) {
                data.append(key, value);
            }
        } else {
            data = values
        }

        console.log(contentType);

        client.post('http://localhost:8000/test/', data, {headers: {'Content-Type': contentType}})
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
    const formFields = fields ? fields.map((field, index) => {
        if (['DateField', 'DateTimeField', 'TimeField', 'DurationField', 'FileField'].includes(field.type)) return (
            <FormInput
                key={index}
                field={field}
                value={values[field.name]}
                fieldInputValue={fieldsInputValues[field.name]}
                errors={errors[field.name]}
                onChange={handleValuesChange}
                onClick={handleRemoveErrors}/>); else return (<FormInput
            key={index}
            field={field}
            value={values[field.name]}
            errors={errors[field.name]}
            onChange={handleValuesChange}
            onClick={handleRemoveErrors}/>);
    }) : [];

    return (<Box sx={{width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Form onSubmit={handleFormSubmit}>
            {formFields}

            <Button variant="contained" type="submit">Submit</Button>
        </Form>
    </Box>);
};

export default DynamicForm;