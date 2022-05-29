import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

const getMenuItems = (providedChoices, inputProps, htmlCutoff = null, htmlCutoffText = null, type) => {
    let menuItems = [];
    let counter = 1;

    if (!inputProps.required && type !== "MultipleChoiceField") {
        menuItems.push(<MenuItem value="" key={0}>--------</MenuItem>);
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

const ChoiceField = ({field: {attrs, type}, errors, value, inputProps, onChange, onClick, ...props}) => {
    const menuItems = getMenuItems(attrs['choices'], inputProps, attrs['html_cutoff'], attrs['html_cutoff_text'], type);
    const id = `id_${props.name}`;
    const label_id = `id_${props.name}_label`;

    return (
        <FormControl {...props}>
            {attrs['label'] && <InputLabel id={label_id}>{attrs['label']}</InputLabel>}
            <Select
                multiple={type === "MultipleChoiceField"}
                label={attrs['label'] || ''}
                labelId={label_id}
                id={id}
                value={value ? value: type === "MultipleChoiceField" ? [] : ''}
                error={!!errors}
                onChange={event => onChange(event, props.name)}
                onClick={event => onClick(event, props.name)}
                inputProps={inputProps}
            >
                {menuItems}
            </Select>
            {(attrs['help_text'] || errors) &&
            <FormHelperText>{errors.join('.\n') || attrs['help_text']}</FormHelperText>}
        </FormControl>
    );
};

export default ChoiceField;
