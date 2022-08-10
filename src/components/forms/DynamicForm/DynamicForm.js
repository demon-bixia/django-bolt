import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import client from "../../../application/client";
import { selectCsrfToken } from "../../authentication/AuthProvider/authProviderSlice";
import { getChangeValue, getRequestData, getStartingValues } from "../utils";

// a form component that fetches fields dynamically from the server and manages their state.
const DynamicForm = ({ url, method = "post", FormComponent }) => {
    const [status, setStatus] = useState('idle');
    const [serializerFields, setSerializerFields] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [nonFieldErrors, setNonFieldErrors] = useState([])
    const csrfToken = useSelector(selectCsrfToken) || '';

    const handleValuesChange = (event, fieldName, field = null) => {
        setValues({ ...values, [fieldName]: getChangeValue(event, field) });
    };

    const handleRemoveErrors = (event, fieldName, childKey = null) => {
        if (childKey) {
            let fieldErrors = errors[fieldName];
            setErrors({ ...errors, [fieldName]: { ...fieldErrors, [childKey]: '' } });
        } else {
            setErrors({ ...errors, [fieldName]: '' });
        }
    };

    const handleRemoveNonFieldErrors = () => {
        setNonFieldErrors([]);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        return (async () => {
            try {
                const [data, headers] = getRequestData(serializerFields, values);
                const response = await client[method.toLowerCase()](url, data, { headers: { ...headers, 'X-CSRFToken': csrfToken } });
                return response;
            } catch (error) {
                setNonFieldErrors(error.response.data['non_field_errors'] || []);
                setErrors(error.response.data || {});
                return Promise.reject(error);
            }
        })();
    };

    useEffect(() => {
        (async () => {
            if (status === 'idle') {
                try {
                    const response = await client.get(url);
                    setSerializerFields(response.data.fields);
                    setValues(getStartingValues(response.data.fields));
                    setStatus('success');
                }
                catch (error) {
                    setStatus('failure');
                }
            }
        })();
    }, []);

    return (
        <FormComponent
            status={status}
            serializerFields={serializerFields}
            values={values}
            errors={errors}
            nonFieldErrors={nonFieldErrors}
            handleValuesChange={handleValuesChange}
            handleFormSubmit={handleFormSubmit}
            handleRemoveErrors={handleRemoveErrors}
            handleRemoveNonFieldErrors={handleRemoveNonFieldErrors}
        />
    );
};

export default DynamicForm;
