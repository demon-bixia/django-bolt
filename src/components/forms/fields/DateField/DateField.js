import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import FeatherIcon from "feather-icons-react";
import { useState } from 'react';

const OpenIcon = () => {
    return (
        <FeatherIcon icon="calendar" size={20} />
    );
};

const DateField = ({
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
            <DatePicker
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

export default DateField;
