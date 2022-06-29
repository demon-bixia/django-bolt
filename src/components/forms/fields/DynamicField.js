import PasswordField from "./PasswordField";
import CharField from "./CharField";
import ChoiceField from "./ChoiceField";
import BooleanField from "./BooleanField";
import DateField from "./DateField";
import DateTimeField from "./DateTimeField";
import TimeField from "./TimeField";
import DurationField from "./DurationField";
import FileField from "./FileField";

// map serializer fields names with mui Input Components
const getFormForSerializerField = ({type, attrs}) => {
    // if choices exist use choice fields
    if (["ChoiceField", "MultipleChoiceField", "FilePathField"].includes(type) || attrs['choices'])
        return ChoiceField;
    // special case for password field
    else if (type === "CharField" && attrs['style']['input_type'] === "password")
        return PasswordField;
    else if (["CharField", "EmailField", "RegexField", "SlugField", "URLField",
        "UUIDField", "IPAddressField", "IntegerField", "FloatField", "DecimalField", 'JSONField'].includes(type))
        return CharField;
    else if (["BooleanField", "NullBooleanField"].includes(type))
        return BooleanField;
    else if (type === "DateField")
        return DateField;
    else if (type === "DateTimeField")
        return DateTimeField;
    else if (type === "TimeField")
        return TimeField;
    else if (type === "DurationField")
        return DurationField;
    else if (["FileField", "ImageField"].includes(type))
        return FileField;
    else
        throw new Error(`${type} is not supported`)

};

// get the html input element props based on drf serializer Type and attributes.
const getInputProps = ({attrs, type}) => {
    const inputProps = {};

    inputProps.required = !(attrs['allow_blank'] || attrs['allow_null'] || !attrs['required']);

    if (["CharField", "EmailField", "RegexField", "SlugField", "URLField"].includes(type)) {
        if (attrs['max_length'])
            inputProps.maxLength = attrs['max_length'];

        if (attrs['min_length'])
            inputProps.minLength = attrs['min_length'];
    }

    if (["IntegerField", "FloatField", "DecimalField"].includes(type)) {
        if (attrs['max_value'])
            inputProps.max = attrs['max_value'];

        if (attrs['min_value'])
            inputProps.min = attrs['min_value'];
    }

    return inputProps;
};

// renders the best material ui input element based on drf serializer field type and attributes.
const DynamicField = ({field, ...props}) => {
    const Field = getFormForSerializerField(field);
    const inputProps = getInputProps(field);

    return (
        <Field
            {...props}
            field={field}
            inputProps={inputProps}
            name={field.name}
        />
    );
};

export default DynamicField;
