import { FormHelperText, Select, FormControl, MenuItem, InputLabel } from '@mui/material';

const getMenuItems = (providedChoices, inputProps, htmlCutoff = null, htmlCutoffText = null, type) => {
    let menuItems = [];
    let counter = 1;

    if (!inputProps.required && type !== "MultipleChoiceField") {
        menuItems.push(<MenuItem value={null} key={0}>--------</MenuItem>);
    }

    for (let [value, choice] of Object.entries(providedChoices)) {
        if (!htmlCutoff || counter <= htmlCutoff) {
            menuItems.push(<MenuItem value={value} key={counter}>{choice}</MenuItem>);
            counter++;
        }
    }

    if (htmlCutoff && counter <= Object.keys(providedChoices).length) {
        menuItems.push(<MenuItem value="n/a" disabled key={counter}>{htmlCutoffText}</MenuItem>);
    }

    return menuItems;
};

const ChoiceField = ({
    serializerField: { attrs, type, name },
    errors,
    value,
    inputProps,
    handleValuesChange,
    handleRemoveErrors,
    ...props }) => {

    const menuItems = getMenuItems(attrs['choices'], inputProps, attrs['html_cutoff'], attrs['html_cutoff_text'], type);
    const id = `id_${name}`;
    const inputId = `id_${name}_input`
    const labelId = `id_${name}_label`;

    return (
        <FormControl {...props} error={errors.length > 0}>
            <InputLabel id={labelId} htmlFor={inputId}>{attrs['label']}</InputLabel>

            <Select
                id={id}
                labelId={labelId}
                multiple={type === "MultipleChoiceField" || type === "ManyRelatedField"}
                name={name}
                label={attrs['label'] || ''}
                value={value ? value : type === "MultipleChoiceField" ? [] : ''}
                onChange={event => handleValuesChange(event, name)}
                onClick={event => handleRemoveErrors(event, name)}
                inputProps={{ ...inputProps, 'id': inputId }}
            >
                {menuItems}
            </Select>

            {
                (attrs['help_text'] || errors.length > 0) ?
                    <FormHelperText >
                        {
                            errors.length > 0
                                ? errors.join('.\n')
                                : attrs['help_text']
                        }
                    </FormHelperText>
                    : null
            }
        </FormControl>
    );
};

export default ChoiceField;
