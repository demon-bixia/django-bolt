import moment from "moment";
import BooleanField from "./fields/BooleanField";
import CharField from "./fields/CharField";
import ChoiceField from "./fields/ChoiceField";
import DateField from "./fields/DateField";
import DateTimeField from "./fields/DateTimeField";
import DictField from "./fields/DictField";
import DurationField from "./fields/DurationField";
import FileField from "./fields/FileField";
import JSONValueField from "./fields/JSONValueField";
import ListField from "./fields/ListField";
import PasswordField from "./fields/PasswordField";
import TimeField from "./fields/TimeField/TimeField";

// checks whether the field is compoiste of multiple field or not
const isComposite = (field) => {
    if (!field.attrs.default && field.attrs.child) {
        return true;
    } else if (field.attrs.default || !field.attrs.child) {
        return false;
    } else {
        return false;
    }
};

// utility for getting a field out of serializerFields using name.
export const getFieldByName = (fieldName, serializerFields) => {
    return serializerFields.find((serializerField) => serializerField.name === fieldName);
};

// get the appropriate material ui component based on the serializer field
export const getMuiInputComponent = serializerField => {
    // text and numeric fields 
    if (serializerField.type === "CharField" && serializerField.attrs['style']['input_type'] === "password")
        return PasswordField;
    else if (["CharField", "EmailField", "RegexField", "SlugField", "URLField", "UUIDField", "IPAddressField",
        "IntegerField", "FloatField", "DecimalField", "JSONField"].includes(serializerField.type)) {
        return CharField;
    }

    // choice fields
    else if (["FilePathField", "ChoiceField", "MultipleChoiceField", "PrimaryKeyRelatedField",
        "HyperlinkedRelatedField", "SlugRelatedField", "ManyRelatedField"].includes(serializerField.type)) {
        return ChoiceField;
    }

    // boolean fields
    else if (["BooleanField", "NullBooleanField"].includes(serializerField.type)) {
        return BooleanField;
    }

    // datetime fields
    else if (serializerField.type === 'DateField')
        if (serializerField.attrs.input_formats.includes('YYYY-MM-DD')) {
            return DateField;
        }
        else {
            return CharField;
        }
    else if (serializerField.type === 'DateTimeField')
        if (serializerField.attrs.input_formats.includes('YYYY-MM-DDThh:mm[:ss[.uuuuuu]][+HH:MM|-HH:MM|Z]')) {
            return DateTimeField;
        }
        else {
            return CharField;
        }
    else if (serializerField.type === 'TimeField') {
        if (serializerField.attrs.input_formats.includes('hh:mm[:ss[.uuuuuu]]')) {
            return TimeField;
        }
        else {
            return CharField;
        }
    }
    else if (serializerField.type === 'DurationField') {
        return DurationField;
    }
    // file fields 
    else if (['FileField', 'ImageField'].includes(serializerField.type)) {
        return FileField;
    }
    // composite fields
    else if (serializerField.type === 'ListField' && isComposite(serializerField)) {
        return ListField;
    }
    else if (['DictField', 'HStoreField'].includes(serializerField.type) && isComposite(serializerField)) {
        return DictField;
    }

    else if (['ListField', 'DictField', 'HstoreField'].includes(serializerField.type) && !isComposite(serializerField)) {
        return JSONValueField;
    }

    else {
        throw Error("field not supported");
    }
};

// get the inputProps to be used in the mui input.
export const getInputProps = serializerField => {
    const inputProps = {};

    // figure out whether or not to require the input field
    let required = true;

    if (serializerField.attrs['allow_blank'] || serializerField.attrs['allow_null'] || Boolean(serializerField.attrs['default'])) {
        required = false;
    }

    else if (serializerField.attrs['required']) {
        required = true;
    }

    if (serializerField.attrs.choices) {
        required = true;
    }

    inputProps.required = required;

    // set max_length and min_length for charFields
    if (['CharField', 'EmailField', 'RegexField', 'SlugField', 'URLField', "IPAddressField"].includes(serializerField.type)) {
        inputProps.maxLength = serializerField.attrs.max_length;
        inputProps.minLength = serializerField.attrs.min_length;
    }

    // set max_value and min value for numeric fields
    if (['IntegerField', 'FloatField', 'DecimalField'].includes(serializerField.type)) {
        inputProps.max = serializerField.attrs.max_value;
        inputProps.min = serializerField.attrs.min_value;
    }

    // for floats set step to any
    if (['FloatField', 'DecimalField'].includes(serializerField.type)) {
        inputProps.step = 'any';
    }

    return inputProps;
};

// set initial values and default values for every field
export const getStartingValues = serializerFields => {
    let values = {};
    for (let serializerField of serializerFields) {
        if (['ListField'].includes(serializerField.type)) {
            values[serializerField.name] = [];
        }

        else if (['DictField', 'HStoreField'].includes(serializerField.type)) {
            values[serializerField.name] = {};
        }

        else if (['BooleanField', 'NullBooleanField'].includes(serializerField.type)) {
            values[serializerField.name] = !!serializerField.attrs.initial;
        }

        else {
            values[serializerField.name] = serializerField.attrs.initial;
        }
    }
    return values;
}

// get the current values of every field
export const getCurrentValues = serializerFields => {
    let values = {};
    for (let serializerField of serializerFields) {
        values[serializerField.name] = serializerField.attrs.current_value;
    }
    return values;
}

// get the value of the field based on field type
export const getChangeValue = (event, field = null) => {
    if (field && ['BooleanField', 'NullBooleanField'].includes(field.type)) {
        return event.target.checked;
    }

    else if (field && ["DateField", "DateTimeField", "TimeField", "DurationField"].includes(field.type)) {
        return formatToIso(event, field.type);
    }

    else if (field && ['FileField', 'ImageField'].includes(field.type) && !field.attrs.default) {
        return event;
    }

    else if (field && ['ListField', 'DictField', 'HStoreField'].includes(field.type)) {
        return event;
    }

    else {
        return event.target.value;
    }
};


// get the request data and headers appropriate for the serializerFields
// i.e if there is a file field use multipart/form-data else json
export const getRequestData = (serializerFields, values) => {
    let headers = { 'Content-Type': 'application/json' };
    let newValues = { ...values };
    let data;

    // set default values for if the field is blank or null.
    for (let [key, value] of Object.entries(newValues)) {
        let field = getFieldByName(key, serializerFields)
        /*
            For BooleanField and NullBooleanField: 

            if the value is not boolean
            check for set blank and null values based on allow_blank adn allow_null, if (allow_null,
            allow_blank, and default) are not set the set value to false.

            if the value is boolean then just use it.
        */
        if (["BooleanField", "NullBooleanField"].includes(field.type) && typeof newValues[key] !== "boolean") {
            if (!value) {
                let pass = false;
                if (field.attrs.allow_null) {
                    newValues[key] = null;
                    pass = true;
                }
                if (field.attrs.allow_blank) {
                    newValues[key] = '';
                    pass = true;
                }
                if (field.attrs.default) {
                    delete newValues[key];
                    pass = true;
                }

                if (!pass) {
                    newValues[key] = false;
                }
            }
        }

        else if (["ListField", "DictField", "HstoreField"].includes(field.type) && isComposite(field)) {
            let isEmpty = field.type === 'ListField' ? value.length === 0 : Object.values(value).length === 0;

            if (isEmpty && field.attrs.allow_null) {
                newValues[key] = null;
            }

            if (isEmpty && field.attrs.allow_blank) {
                newValues[key] = '';
            }

            if (isEmpty && field.attrs.default) {
                delete newValues[key];
            }
        }

        else {
            /* for other values check for null and blank regardless of value type */
            if (!value && field.attrs.allow_null) {
                newValues[key] = null;
            }

            if (!value && field.attrs.allow_blank) {
                newValues[key] = '';
            }

            if (!value && field.attrs.default) {
                delete newValues[key];
            }
        }
    }



    // check if there are file fields and set content type to multipart/form-data.
    for (let serializerField of serializerFields) {
        if (['JSONField'].includes(serializerField.type)) {
            headers['Content-Type'] = 'multipart/form-data';
        }
        if (['FileField', 'ImageField'].includes(serializerField.type)) {
            headers['Content-Type'] = 'multipart/form-data';
        }
    }

    // if content type is multipart/form-data change the data from object to FormData.
    if (headers['Content-Type'] === 'multipart/form-data') {
        data = new FormData();
        for (let [key, value] of Object.entries(newValues)) {
            data.append(key, value);
        }
    } else {
        data = { 'data': newValues };
    }

    return [data, headers];
};


// format date type inputs to appropriate iso format
export const formatToIso = (event, fieldType) => {
    try {
        if (fieldType === 'DateField') {
            return moment(event.value).format('YYYY-MM-DD');
        }
        else if (fieldType === 'DateTimeField') {
            return moment(event.value).format('YYYY-MM-DDTHH:mm:ssZ');
        }
        else if (fieldType === 'TimeField') {
            return moment(event.value).format('hh:mm:ss');
        }
        else if (fieldType === 'DurationField') {
            return moment(event.value).format('DD HH:MM:SS');
        }
        else {
            return event.value;
        }
    }
    catch (error) {
        return event.keyboardInputValue;
    }
};

// get a list of fields based on field count
export const getFields = (fieldCount, childSerializerField) => {
    const InputComponent = getMuiInputComponent(childSerializerField);
    let fields = [];

    for (let index = 0; index < fieldCount; index++) {
        fields.push(
            InputComponent
        );
    }

    return fields;
};
