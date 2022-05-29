import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

const BooleanField = ({field: {attrs, type}, value, errors, inputProps, onChange, onClick, ...props}) => {
    return (
        <FormControl {...props} error={!!errors}>
            <FormControlLabel
                control={<Checkbox checked={value || false} inputProps={{...inputProps, required: false}} />}
                label={attrs['label'] || ''}
                onChange={event => onChange(event, props.name, "checkbox")}
                onClick={event => onClick(event, props.name)}
            />
            {(attrs['help_text'] || errors) &&
            <FormHelperText>{errors.join('.\n') || attrs['help_text']}</FormHelperText>}
        </FormControl>
    );
};

export default BooleanField;