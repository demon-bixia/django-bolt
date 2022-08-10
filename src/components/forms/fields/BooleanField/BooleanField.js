import { FormControlLabel, Checkbox, FormHelperText, FormControl } from '@mui/material';

const BooleanField = ({
    serializerField: { attrs, type, name },
    value,
    errors,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props }) => {

    return (
        <FormControl {...props} error={errors.length > 0}>
            <FormControlLabel
                control={<Checkbox checked={value || false} inputProps={{ ...inputProps, required: false }} />}
                label={attrs['label'] || ''}
                onChange={event => handleValuesChange(event, name, { name, type, attrs })}
                onClick={event => handleRemoveErrors(event, name)}
            />
            {
                errors.length > 0
                    ? <FormHelperText>{errors.join('.\n')}</FormHelperText>
                    : <FormHelperText>{attrs['help_text']}</FormHelperText>
            }
        </FormControl>
    );
};

export default BooleanField;
