import TextField from '@mui/material/TextField';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DateTimePicker} from '@mui/x-date-pickers/DateTimePicker';
import FeatherIcon from "feather-icons-react";
import moment from "moment";

const OpenIcon = () => {
    return (
        <FeatherIcon icon="calendar" size={20}/>
    );
};

// the form input only accepts one format
const DateTimeField = ({
                           field: {attrs, type},
                           value,
                           fieldInputValue,
                           errors,
                           inputProps,
                           onClick,
                           onChange,
                           ...props
                       }) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
                required={inputProps['required'] || false}
                components={{OpenPickerIcon: OpenIcon}}
                label={attrs['label']}
                value={fieldInputValue || ''}
                onChange={event => onChange({
                    'formatted': moment(event).format('YYYY-MM-DDTHH:mm:ssZ'),
                    'default': event
                }, props.name, 'dateTimePicker')}
                renderInput={(params) => <TextField
                    {...params}
                    {...props}
                    error={!!errors}
                    onClick={event => onClick(event, props.name)}
                    helperText={errors ? errors.join('.\n') : attrs['help_text'] || ''}
                />}
            />
        </LocalizationProvider>
    );
};

export default DateTimeField;
