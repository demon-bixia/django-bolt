import TextField from "@mui/material/TextField";

const getType = (attrs, type) => {
    if (attrs['style']['input_type'])
        return "password";
    else if (type === "EmailField")
        return "password";
    else if (["IntegerField", "FloatField"].includes(type))
        return "number";
    else if (["DecimalField", "CharField"].includes(type))
        return "text";
    else
        return "text";
};

const CharField = ({field: {attrs, type}, errors, value, inputProps, onChange, onClick, ...props}) => {

    return (
        <TextField
            {...props}
            type={getType(attrs, type)}
            error={!!errors}
            value={value || ''}
            label={attrs['label'] || ''}
            helperText={errors ? errors.join('.\n') : attrs['help_text'] || ''}
            inputProps={inputProps}
            onChange={event => onChange(event, props.name)}
            onClick={event => onClick(event, props.name)}
        />
    );
};

export default CharField;
