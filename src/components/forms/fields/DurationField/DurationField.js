import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FeatherIcon from "feather-icons-react";
import { useState } from "react";

const OpenIcon = () => {
    return (
        <FeatherIcon icon="calendar" size={20} />
    );
};

// the form input only accepts one format
const DurationField = ({
    serializerField: { attrs, type: fieldType, name },
    value,
    fieldInputValue,
    errors,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props
}) => {
    const [displayValue, setDisplayValue] = useState('');

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
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
                                : attrs['help_text'] || 'DD HH:MM:SS'
                        }
                    />
                )}
            />
        </LocalizationProvider>
    );
};

export default DurationField;
