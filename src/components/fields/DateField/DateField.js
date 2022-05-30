import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FeatherIcon from "feather-icons-react";
import moment from 'moment';

const OpenIcon = () => {
    return (
        <FeatherIcon icon="calendar" size={20} />
    );
};

const DateField = ({ field: { attrs, type }, value, fieldInputValue, errors, inputProps, onClick, onChange, ...props }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                required={inputProps['required'] || false}
                components={{ OpenPickerIcon: OpenIcon }}
                label={attrs['label']}
                value={fieldInputValue || ''}
                onChange={(event) => onChange({ 'formatted': moment(event).format('YYYY-MM-DD'), 'default': event }, props.name, 'datePicker')}
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

export default DateField;
