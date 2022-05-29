import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import FeatherIcon from "feather-icons-react";
import moment from 'moment';

const OpenIcon = () => {
    return (
        <FeatherIcon icon="clock" size={20} />
    );
};

const TimeField = ({ field: { attrs, type }, value, dateInputValue, errors, inputProps, onClick, onChange, ...props }) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
                required={inputProps['required'] || false}
                components={{ OpenPickerIcon: OpenIcon }}
                label={attrs['label']}
                value={dateInputValue || ''}
                onChange={(event) => onChange({ 'formatted': moment(event).format('hh:mm:ss'), 'default': event }, props.name, 'timePicker')}
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

export default TimeField;
