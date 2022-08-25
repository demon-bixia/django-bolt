import { FormInput, Group, Section, SectionTitle } from "./Form";
import DynamicForm from "../../../forms/DynamicForm";
import InlineForm from "./InlineForm/InlineForm";
import GreyButton from "../../../utils/buttons/GreyButton";
import { Box, Alert } from "@mui/material";

const EmptyAlert = ({ instanceName }) => (<Alert severity="info" sx={{ margin: theme => theme.spacing(0, 0, 5, 0) }}>Click add button to add {instanceName}.</Alert>);

export const toCamelCase = (string) => {
    let camelCaseString = [];
    let words = string.split(' ');

    for (let word of words) {
        let letters = word.split('');
        letters[0] = letters[0].toUpperCase();
        camelCaseString.push(letters.join(''));
    }

    return camelCaseString.join('');
};

const getSerializerFieldByName = (serializerFields, name) => {
    let serializerField = serializerFields.find(serializerField => serializerField.name === name);
    return serializerField;
};

export const renderFormFields = (config, serializerFields, props) => {
    if (config.fieldsets) {
        return renderUsingFieldsets(config.fieldsets, serializerFields, props);
    } else if (config.fields) {
        return renderUsingFields(config.fields, serializerFields, props);
    } else {
        return renderFields(serializerFields, props);
    }
};

export const renderInlineForms = (inlines, inlineInstances = {}, addInstance, removeInstance) => {

    return Object.entries(inlineInstances).map(([inlineName, { instances = [] }], index) => {
        const inline = inlines.find((inline) => inline.admin_name === inlineName);
        const inlineForms = instances.map(({ ref, submitStatus }, index) => {
            return (
                <DynamicForm
                    key={index}
                    index={index}
                    ref={ref}
                    removeInstance={removeInstance}
                    inline={inline}
                    url={inline.url}
                    method='post'
                    formFields={inline.fields}
                    FormComponent={InlineForm}
                    config={inline.config}
                />
            );
        });

        return (<Section key={inlineName}>
            <SectionTitle>{toCamelCase(inline.name)}</SectionTitle>

            <Box>{inlineForms.length > 0 ? inlineForms : <EmptyAlert instanceName={inline.name} />}</Box>

            <Box>
                <GreyButton variant="outlined" onClick={event => addInstance(inlineName)}>
                    Add {inline.object_name}
                </GreyButton>
            </Box>
        </Section>);
    });


};

// renders form fields.
export const renderFields = (serializerFields, props) => {
    return serializerFields.map((serializerField) => {
        return (<FormInput
            className="form-input"
            key={serializerField.name}
            serializerField={serializerField}
            {...props}
        />);
    })
};

// renders form fields with sections using fieldsets option.
export const renderUsingFieldsets = (fieldsets, serializerFields, props) => {
    return fieldsets.map(([title, { fields, description }], index) => {
        let sectionFields = fields.map(field => {
            // if the field is an array of fields then but them in a group
            if (Array.isArray(field)) {
                let group = getGroup(field, serializerFields, props, index);
                if (group) {
                    return group;
                }
            } else {
                let formField = getField(field, serializerFields, props);
                if (formField) {
                    return formField;
                }
            }
        });

        return (<Section key={index}>
            <SectionTitle>{title}</SectionTitle>
            {sectionFields}
        </Section>);
    })
};

// renders form fields using fields option.
export const renderUsingFields = (fields, serializerFields, props) => {
    return fields.map((field, index) => {
        // if the field is an array of fields then but them in a group
        if (Array.isArray(field)) {
            let group = getGroup(field, serializerFields, props, index);
            if (group) {
                return group;
            }
        } else {
            let formField = getField(field, serializerFields, props);
            if (formField) {
                return formField;
            }
        }
    })
};

// renders a group of form fields
const getGroup = (group, serializerFields, props, index) => {
    let groupFields = group.map(part => {
        let serializerField = getSerializerFieldByName(serializerFields, part);
        if (serializerField) {
            return (<FormInput
                className="form-input"
                key={serializerField.name}
                serializerField={serializerField}
                {...props}
            />);
        }
    });

    return (<Group key={`group_${index}`}>
        {groupFields}
    </Group>);
};

// renders a single form field
const getField = (field, serializerFields, props) => {
    let serializerField = getSerializerFieldByName(serializerFields, field);
    if (serializerField) {
        return (<FormInput
            className="form-input"

            key={serializerField.name}
            serializerField={serializerField}
            {...props}
        />);
    }
};