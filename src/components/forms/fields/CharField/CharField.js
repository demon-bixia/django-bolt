import TextField from "@mui/material/TextField";

const getType = (attrs, fieldType) => {
    if (attrs['style']['input_type'])
        return "password";
    else if (["DecimalField", "IntegerField", "FloatField"].includes(fieldType))
        return "number";
    else
        return "text";
};

const getMultiline = (attrs, type) => {
    if (attrs.style.input_type === 'textarea') {
        return true;
    }

    if (['JSONField', 'HStoreField', 'DictField', 'ListField'].includes(type)) {
        return true;
    }

    return false;
};

const CharField = ({
    serializerField: { attrs, type: fieldType, name },
    type = null,
    errors,
    value,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props }) => {

    // helper text to display is using datetime based fields
    let inputFormat;
    if (attrs.input_formats) {
        inputFormat = attrs.input_formats[0]
    }

    return (
        <TextField
            {...props}
            aria-label={attrs['label']}
            type={type || getType(attrs, fieldType)}
            error={errors.length > 0}
            value={value || ''}
            label={attrs['label'] || ''}
            placeholder={inputFormat || ''}
            multiline={getMultiline(attrs, fieldType)}
            maxRows={getMultiline(attrs, fieldType) ? 10 : 1}
            helperText={
                errors.length > 0
                    ? errors.join('.\n')
                    : attrs['help_text'] || inputFormat || ''}
            inputProps={inputProps}
            onChange={event => handleValuesChange(event, name)}
            onClick={event => handleRemoveErrors(event, name)}
        />
    );
};

export default CharField;
