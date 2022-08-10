import TextField from "@mui/material/TextField";
import { useState } from "react";


const JSONValueField = ({
    serializerField: { attrs, type, name },
    errors,
    value,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props }) => {

    const initialValue = type === 'ListField' ? '[]' : '{}'

    const [displayValue, setDisplayValue] = useState(initialValue);
    const [parseError, setParseError] = useState({ showError: false, message: '' });

    const helpText = type === 'ListField' ? 'a valid json array' : 'a valid json object';

    return (
        <TextField
            {...props}
            aria-label={attrs['label']}
            type='text'
            error={parseError.showError || errors.length > 0}
            value={displayValue || ''}
            label={attrs['label'] || ''}
            multiline={true}
            maxRows={10}
            helperText={
                errors.length > 0 || parseError.showError
                    ? parseError.message || errors.join('.\n')
                    : attrs['help_text'] || helpText
            }
            inputProps={inputProps}
            onChange={event => {
                let value = event.target.value;
                setDisplayValue(value);
                try {
                    let parsedList = JSON.parse(value);
                    setParseError({ showError: false, message: '' });
                    handleValuesChange(parsedList, name, { name, type, attrs });
                } catch (error) {
                    setParseError({
                        showError: false,
                        message: 'Invalid json null will be submitted'
                    });
                    handleValuesChange(null, name, { name, type, attrs });
                }
            }}
            onBlur={event => {
                if (parseError.message) {
                    setParseError({ ...parseError, showError: true });
                }
            }}
            onClick={event => {
                setParseError({ ...parseError, showError: false });
                handleRemoveErrors(event, name)
            }}
        />
    );
};

export default JSONValueField;
