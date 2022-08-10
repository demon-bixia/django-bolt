import { Alert, AlertTitle, Box, IconButton, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import GreyButton from "../../../utils/GreyButton";
import { getChangeValue, getFields, getInputProps } from "../../utils";


const allowRemove = (minLength, fieldLength) => {
    if (minLength) {
        return fieldLength > minLength;
    } else {
        return fieldLength > 1;
    }
};

const allowAdd = (maxLength, fieldLength) => {
    if (maxLength) {
        return fieldLength < maxLength;
    } else {
        return true;
    }
}

const Icon = styled(FeatherIcon)(({ theme }) => ({
    strokeWidth: '1.5px',
}));

const ListField = ({
    serializerField: { attrs, type, name },
    errors,
    value,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props
}) => {

    const [fieldCount, setFieldCount] = useState(1);
    const [startingValue, setStartingValue] = useState(null);
    const [fields, setFields] = useState([]);
    const childInputProps = getInputProps(attrs.child);

    const theme = useTheme();

    const handleChildrenValuesChange = (event, childName, field = null) => {
        let fieldValue = getChangeValue(event, field);
        // get the index of the field.
        let fieldIndex = Number(childName.replace(`${name}_`, '')) - 1;

        // create a new array of values and update the correct index.
        let newValues;
        if (value.length > 0) {
            newValues = value.map((value, index) => (index === fieldIndex ? fieldValue : value));
        } else {
            newValues = [fieldValue];
        }

        // save the value of the list field in dynamic form values.
        handleValuesChange(newValues, name, { name, type, attrs });
    };

    const handleRemoveChildrenErrors = (event, childName) => {
        handleRemoveErrors(event, name, childName);
    };

    const handleAddField = () => {
        if (allowAdd(attrs.max_length, fields.length)) {
            // update field values to add starting value to the field.
            let newValues = [...value];
            newValues.push(startingValue);
            handleValuesChange(newValues, name, { name, type, attrs });

            // add a new field.
            setFieldCount(fieldCount + 1);
        }
    };

    const handleRemoveField = (childName) => {
        if (allowRemove(attrs.min_length, fields.length)) {
            // get the index of the field.
            let fieldIndex = Number(childName.replace(`${name}_`, '')) - 1
            // remove the value of the removed child field.
            let newValues = [...value];
            newValues.splice(fieldIndex, 1);
            handleValuesChange(newValues, name, { name, type, attrs });
            // reduce count;
            setFieldCount(fieldCount - 1);
        }
    };

    // should only run once.
    useEffect(() => {
        setStartingValue(value[0]);
    }, []);

    // runs everytime fieldCount changes.
    useEffect(() => {
        setFields(getFields(fieldCount, attrs.child));
    }, [fieldCount]);

    return (
        <>
            {
                ['FileField', 'ImageField'].includes(attrs.child.type)
                    ? (
                        <Alert severity="error" variant="filled" sx={{ backgroundColor: theme.palette.error.light, color: theme.palette.error.dark }}>
                            <AlertTitle>Not supported</AlertTitle>
                            File based fields are not supported
                        </Alert>
                    )
                    : (
                        <Box>
                            <Typography sx={{ marginBottom: theme.spacing(5) }}>{attrs.label}:</Typography>
                            {
                                fields.map((Field, index) => {
                                    let childName = `${name}_${index + 1}`;
                                    let fieldsLength = fields.length;

                                    return (
                                        <Box key={index} sx={{ display: "flex", justifyContent: "start", alignItems: "start" }}>
                                            <Box sx={{ flexBasis: allowRemove(attrs.min_length, fields.length) ? '80%' : '100%', marginRight: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                                                <Field
                                                    {...{
                                                        ...props,
                                                    }}
                                                    serializerField={{ ...attrs.child, name: childName }}
                                                    errors={errors[index] || []}
                                                    value={value[index]}
                                                    inputProps={{ ...childInputProps, 'data-testid': `list-field-input-${index + 1}` }}
                                                    handleValuesChange={handleChildrenValuesChange}
                                                    handleRemoveErrors={handleRemoveChildrenErrors}
                                                />
                                            </Box>

                                            <Box sx={{ flexBasis: '20%', height: "53px", display: allowRemove(attrs.min_length, fields.length) ? 'flex' : 'none', alignItems: 'center' }}>
                                                <IconButton
                                                    onClick={() => handleRemoveField(childName)} aria-label="delete"
                                                    sx={{ border: `1px solid ${theme.palette.border}` }}
                                                    data-testid={`list-field-remove-${index + 1}`}
                                                >
                                                    <Icon icon="x" size={12} />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    );
                                })
                            }

                            <GreyButton
                                startIcon={<Icon icon="plus" size={20} />}
                                variant="outlined"
                                onClick={handleAddField}
                                sx={{ display: allowAdd(attrs.max_length, fields.length) ? 'flex' : 'none' }}
                                data-testid={`list-field-add-button`}
                            >
                                Add a new {attrs.child.attrs.label}
                            </GreyButton>
                        </Box>
                    )
            }

        </>
    );
};

export default ListField;
