import { Alert, AlertTitle, Box, IconButton, TextField, Typography } from "@mui/material";
import { styled, useTheme } from "@mui/system";
import FeatherIcon from "feather-icons-react";
import { useEffect, useState } from "react";
import GreyButton from "../../../utils/buttons/GreyButton";
import { getChangeValue, getInputProps, getMuiInputComponent, getStartingValues } from "../../utils";

const Icon = styled(FeatherIcon)(({ theme }) => ({
    strokeWidth: '1.5px',
}));

const buildDict = (pairs) => {
    let dict = {};

    for (let pair of Object.values(pairs)) {
        dict[pair.key] = pair.value;
    }

    return dict;
};


const DictField = ({
    serializerField: { attrs, type, name },
    errors,
    value,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props
}) => {

    const [status, setStatus] = useState("idle");
    const [pairs, setPairs] = useState({});
    const [startingValue, setStartingValue] = useState();
    const [keyErrors, setKeyErrors] = useState({});

    const Field = getMuiInputComponent(attrs.child);
    const childInputProps = getInputProps(attrs.child);

    const theme = useTheme();

    const handleRemoveChildrenErrors = (event, fieldName, isKey = false) => {
        if (isKey) {
            let pairName = fieldName.replace('key_', '');
            let newKeyErrors = { ...keyErrors };
            delete newKeyErrors[pairName];
            setKeyErrors(newKeyErrors);
        } else {
            handleRemoveErrors(event, name, fieldName);
        }
    };

    const handleAddField = (event) => {
        let pairsLength = Object.entries(pairs).length;
        const pairName = `pair_${pairsLength + 1}`;
        // update pairs
        const newPairs = { ...pairs, [pairName]: { key: '', value: startingValue } };
        setPairs(newPairs);
        // update status
        setStatus('unsaved');
    };

    const handleRemoveField = (pairName) => {
        let pairsLength = Object.entries(pairs).length;

        if (pairsLength > 1) {
            // update pairs
            const newPairs = { ...pairs };
            delete newPairs[pairName];
            setPairs(newPairs);
            // update status
            setStatus('unsaved');
        }
    };

    const handleChildrenValuesChange = (event, fieldName, field = null, isKey = false) => {
        setStatus('unsaved');

        if (isKey) {
            // extract change value from field
            const changeValue = event.target.value;
            // extract pairName form fieldName
            const pairName = fieldName.replace('key_', '');
            // update pairs
            const pair = pairs[pairName];
            const newPairs = { ...pairs, [pairName]: { ...pair, key: changeValue } };
            setPairs(newPairs);
        } else {
            // extract change value from field
            const changeValue = getChangeValue(event, attrs.child);
            // extract pairName form fieldName
            const pairName = fieldName.replace('value_', '');
            // update pairs
            const pair = pairs[pairName];
            const newPairs = { ...pairs, [pairName]: { ...pair, value: changeValue } };
            setPairs(newPairs);
        }
    };

    const handleSave = () => {
        // test if there are duplicated keys
        let keys = [];
        let newKeyErrors = {};
        let hasErrors = false;
        let newDict = {};

        for (let [pairName, pair] of Object.entries(pairs)) {
            if (keys.includes(pair.key)) {
                hasErrors = true;
                newKeyErrors[pairName] = ["This key is duplicated, keys must be unique."];
            } else {
                keys.push(pair.key);
                newDict[pair.key] = pair.value;
            }
        }

        if (hasErrors) {
            setKeyErrors(newKeyErrors);
        } else {
            // update status
            setStatus('saved');
            // remove all key errors
            setKeyErrors({});
        }

        // merge changes with dynamic form dict.
        handleValuesChange(newDict, name, { name, type, attrs });
    };


    // runs once
    useEffect(() => {
        // get initial value
        const value = Object.values(getStartingValues([attrs.child]))[0];
        setStartingValue(value);
        // update pairs with initial value
        let newPairs = { 'pair_1': { key: '', value: value } };
        setPairs(newPairs);
        // update dict with initial value
        if (inputProps.required) {
            let newDict = buildDict(newPairs);
            handleValuesChange(newDict, name, { name, type, attrs });
        }
        // update status
        setStatus('saved');
    }, []);


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
                            {
                                status === 'idle'
                                    ? null
                                    : (
                                        <>
                                            <Typography sx={{ marginBottom: theme.spacing(5) }}>{attrs.label}:</Typography>
                                            {
                                                Object.entries(pairs).map(([pairName, pair], index) => {
                                                    let valueFieldName = `value_${pairName}`;
                                                    let keyFieldName = `key_${pairName}`;
                                                    let pairsLength = Object.entries(pairs).length;

                                                    return (
                                                        <Box key={pairName} sx={{ display: "flex", justifyContent: "start", alignItems: "start" }}>
                                                            <Box sx={{ flexBasis: pairsLength > 1 ? '40%' : '50%', marginRight: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                                                                <TextField
                                                                    name={keyFieldName}
                                                                    type="text"
                                                                    label="key"
                                                                    inputProps={{ 'data-testid': `dict-field-key-${index + 1}` }}
                                                                    value={pair.key}
                                                                    error={Boolean(keyErrors[pairName])}
                                                                    helperText={Boolean(keyErrors[pairName]) ? keyErrors[pairName].join('.\n') : ''}
                                                                    onChange={(event) => handleChildrenValuesChange(event, keyFieldName, null, true)}
                                                                    onClick={(event) => handleRemoveChildrenErrors(event, keyFieldName, true)}
                                                                />
                                                            </Box>

                                                            <Box sx={{ flexBasis: pairsLength > 1 ? '40%' : '50%', marginRight: theme.spacing(4), marginBottom: theme.spacing(4) }}>
                                                                <Field
                                                                    {...{
                                                                        ...props,
                                                                    }}
                                                                    serializerField={{ ...attrs.child, name: valueFieldName }}
                                                                    errors={errors[pair.key] || []}
                                                                    value={pair.value}
                                                                    inputProps={{ ...childInputProps, 'data-testid': `dict-field-value-${index + 1}` }}
                                                                    handleValuesChange={handleChildrenValuesChange}
                                                                    handleRemoveErrors={handleRemoveChildrenErrors}
                                                                />
                                                            </Box>

                                                            <Box sx={{ flexBasis: '20%', height: "53px", display: pairsLength > 1 ? 'flex' : 'none', alignItems: 'center' }}>
                                                                <IconButton
                                                                    onClick={() => handleRemoveField(pairName)} aria-label="delete"
                                                                    sx={{ border: `1px solid ${theme.palette.border}` }}
                                                                    data-testid={`dict-field-remove-${index + 1}`}
                                                                >
                                                                    <Icon icon="x" size={12} />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                    );
                                                })
                                            }
                                            <Box sx={{ display: 'flex' }}>
                                                <GreyButton
                                                    startIcon={<Icon icon="plus" size={20} />}
                                                    variant="outlined"
                                                    onClick={handleAddField}
                                                    sx={{ marginRight: theme.spacing(3) }}
                                                    data-testid='dict-field-add-button'
                                                >
                                                    Add a new {attrs.child.attrs.label}
                                                </GreyButton>

                                                <GreyButton
                                                    startIcon={<Icon icon="save" size={20} />}
                                                    variant="outlined"
                                                    onClick={handleSave}
                                                    sx={{ display: status === 'saved' ? 'none' : 'flex' }}
                                                    data-testid='dict-field-save-button'
                                                >
                                                    Save
                                                </GreyButton>
                                            </Box>
                                        </>
                                    )
                            }
                        </Box>
                    )
            }

        </>
    )
};

export default DictField;
