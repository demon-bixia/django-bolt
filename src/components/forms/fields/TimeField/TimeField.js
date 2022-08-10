import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const OpenIcon = () => {
    return (
        <FeatherIcon icon="clock" size={20} />
    );
};

const TimeField = ({
    serializerField: { attrs, type: fieldType, name },
    value,
    fieldInputValue,
    errors,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props }) => {

    const [displayValue, setDisplayValue] = useState('');

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                components={{ OpenPickerIcon: OpenIcon }}
                label={attrs['label']}
                value={displayValue || ''}
                inputProps={{ ...inputProps }}

                onChange={(value, keyboardInputValue) => {
                    if (keyboardInputValue !== undefined) {
                        setDisplayValue(keyboardInputValue);
                    } else {
                        setDisplayValue(value);
                    }
                    handleValuesChange({ value, keyboardInputValue }, name, { name, type: fieldType, attrs })
                }}

                renderInput={(params) => (
                    <TextField
                        {...params}
                        {...props}
                        error={errors.length > 0}
                        onClick={event => handleRemoveErrors(event, name)}
                        helperText={
                            errors.length > 0
                                ? errors.join('.\n')
                                : attrs['help_text'] || attrs.input_formats[0] || ''
                        }
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default TimeField;
