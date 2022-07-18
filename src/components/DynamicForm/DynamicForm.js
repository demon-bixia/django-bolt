import DynamicField from "./fields/DynamicField";
import { useEffect, useState } from "react";
import { styled } from "@mui/system";
import moment from "moment";
import client from "../../application/client";
import { useSelector } from "react-redux";
import { selectCsrfToken } from "../AuthProvider/authProviderSlice";

const FormInput = styled(DynamicField)(({ theme }) => ({
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(0),
}));

// todo test dynamic form for (functionality/ accessibility/ customization).
// todo add HStoreField/ListField/JsonField/DictField to dynamic form.
// todo adding loading state to forms.
const DynamicForm = ({ formUrl, FormComponent, ...props }) => {
    const [fields, setFields] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [nonFieldErrors, setNonFieldErrors] = useState([])

    // get the csrftoken to make post requests
    const csrfToken = useSelector(selectCsrfToken);

    // independent value to display in DateFields form inputs
    const [fieldsInputValues, setFieldsInputValues] = useState('');
    const [contentType, setContentType] = useState('application/json');

    let headers = {
        'Content-Type': contentType,
    };

    if (csrfToken)
        headers['X-CSRFToken'] = csrfToken

    // fetch all fields and set the default values
    useEffect(() => {
        const fetchFields = async () => {
            const response = await client.get('/login/', { headers: headers });

            setFields(response.data['fields']);

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
        };

        fetchFields();
    }, []);

    const handleValuesChange = (event, field_name, type = "") => {
        if (type === "checkbox") {
            setValues({ ...values, [field_name]: event.target.checked });
        } else if (["datePicker", "dateTimePicker", "timePicker"].includes(type)) {
            setFieldsInputValues({ ...fieldsInputValues, [field_name]: event['default'] }); // value to display in input
            setValues({ ...values, [field_name]: event['formatted'] }); // value sent to server
        } else if (type === "fileUpload") {
            setFieldsInputValues({
                ...fieldsInputValues, [field_name]: event['file'] ? event['file']['name'] : ''
            })
            setValues({ ...values, [field_name]: event['file'] })
        } else {
            setValues({ ...values, [field_name]: event.target.value });
        }
    };

    const handleRemoveErrors = (event, field_name) => {
        if (errors[field_name]) setErrors({ ...errors, [field_name]: '' });
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        // if using where using multipart/form-data for file uploads
        // create a new FormData object and add the values to it;
        let data;
        if (contentType === "multipart/form-data") {
            data = new FormData();
            for (let [key, value] of Object.entries(values)) {
                data.append(key, value);
            }
        } else {
            data = values
        }

        try {
            return await client.post(formUrl, data, { headers: headers });
        } catch (error) {
            // if there are non_field_errors set them
            setNonFieldErrors(error.response.data['non_field_errors'] || [])

            // get all field errors
            if (error.response.data) {
                let errors = {};
                for (let [key, value] of Object.entries(error.response.data)) {
                    errors[key] = value;
                }
                setErrors(errors);
            }
            return error.response;
        };
    };

    const removeNonFieldError = () => {
        setNonFieldErrors([]);
    };

    // populate the fields state variable with DynamicField's
    const formFields = fields ? fields.map((field, index) => {
        if (['DateField', 'DateTimeField', 'TimeField', 'DurationField', 'FileField', 'ImageField'].includes(field.type))
            return (
                <FormInput
                    key={field.name}
                    field={field}
                    value={values[field.name]}
                    fieldInputValue={fieldsInputValues[field.name]}
                    errors={errors[field.name]}
                    onChange={handleValuesChange}
                    onClick={handleRemoveErrors} />);
        else
            return (<FormInput
                key={field.name}
                field={field}
                value={values[field.name]}
                errors={errors[field.name]}
                onChange={handleValuesChange}
                onClick={handleRemoveErrors} />);
    }) : [];

    return (
        // render the form component with the handleSubmit event and the form fields
        // using whatever style you want
        <FormComponent
            context={{
                "fields": fields,
                "values": values,
                "fieldErrors": errors,
                "handleValuesChange": handleValuesChange,
                "handleRemoveErrors": handleRemoveErrors,
                "fieldsInputValues": fieldsInputValues,
                "nonFieldErrors": nonFieldErrors,
            }}
            formFields={formFields}
            onSubmit={(event) => handleSubmitForm(event)}
            removeNonFieldErrors={removeNonFieldError}
        />
    );
};

export default DynamicForm;