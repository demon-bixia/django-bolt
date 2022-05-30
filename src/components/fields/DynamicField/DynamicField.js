import PasswordField from "../PasswordField/PasswordField";
import CharField from "../CharField/CharField";
import ChoiceField from "../ChoiceField/ChoiceField";
import BooleanField from "../BooleanField/BooleanField";
import DateField from "../DateField/DateField";
import DateTimeField from "../DateTimeField/DateTimeField";
import TimeField from "../TimeField/TimeField";
import DurationField from "../DurationField/DurationField";
import FileField from "../FileField/FileField";

// map serializer fields names with mui Input Components
const getFormForSerializerField = ({type, attrs}) => {
    // if choices exist use choice fields
    if (["ChoiceField", "MultipleChoiceField"].includes(type) || attrs['choices'])
        return ChoiceField;
    // special case for password field
    else if (type === "CharField" && attrs['style']['input_type'] === "password")
        return PasswordField;
    else if (["CharField", "EmailField", "RegexField", "SlugField", "URLField",
        "UUIDField", "IPAddressField", "IntegerField", "FloatField", "DecimalField"].includes(type))
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
