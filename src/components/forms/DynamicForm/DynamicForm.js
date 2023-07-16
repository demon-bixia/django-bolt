import { forwardRef, useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import client from "../../../application/client";
import { selectCsrfToken } from "../../authentication/AuthProvider";
import { getChangeValue, getRequestData, getStartingValues, getCurrentValues } from "../utils";

// a form component that fetches fields dynamically from the server and manages their state.
const DynamicForm = forwardRef(({ url, method = "post", FormComponent, formFields = null, wrap = true, ...props }, ref) => {
    const [status, setStatus] = useState('idle');
    const [serializerFields, setSerializerFields] = useState([]);
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [nonFieldErrors, setNonFieldErrors] = useState([])
    const csrfToken = useSelector(selectCsrfToken) || '';
    const [submitStatus, setSubmitStatus] = useState('idle');

    const handleValuesChange = (event, fieldName, field = null) => {
        setValues({ ...values, [fieldName]: getChangeValue(event, field) });
        if (submitStatus !== 'idle') {
            setSubmitStatus('idle');
        }
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
                const [data, headers] = getRequestData(serializerFields, values, wrap);
                const response = await client[method.toLowerCase()](url, data, {
                    headers: {
                        ...headers,
                        'X-CSRFToken': csrfToken
                    }
                });
                setSubmitStatus('success');
                return response;
            } catch (error) {
                setSubmitStatus('failure');
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
                    let fields = null;

                    if (formFields) {
                        fields = formFields;
                    } else {
                        let response = await client.get(url);
                        fields = response.data.fields;
                    }

                    setSerializerFields(fields);

                    if (method === 'put')
                        setValues(getCurrentValues(fields));
                    else
                        setValues(getStartingValues(fields));

                    setStatus('success');
                } catch (error) {
                    setStatus('failure');
                }
            }
        })();
    }, []);

    return (
        <FormComponent
            status={status}
            submitStatus={submitStatus}
            serializerFields={serializerFields}
            values={values}
            errors={errors}
            nonFieldErrors={nonFieldErrors}
            handleValuesChange={handleValuesChange}
            handleFormSubmit={handleFormSubmit}
            handleRemoveErrors={handleRemoveErrors}
            handleRemoveNonFieldErrors={handleRemoveNonFieldErrors}
            {...(ref ? { formRef: ref } : {})}
            {...props}
        />
    );
});

export default DynamicForm;