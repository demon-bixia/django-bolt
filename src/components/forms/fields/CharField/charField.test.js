import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


test("Submiting blank value when allow blank is false", async () => {
    renderWithProviders(<TestPage url='/test/char_field_render_test/' />);

    let textInput = await screen.findByLabelText('Username', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    expect(textInput).toHaveAttribute('required');


    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'p' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be blank.', { selector: 'p' })).not.toBeNull());
});


test("Submiting null value when allow_null is true", async () => {
    renderWithProviders(<TestPage url='/test/char_field_null_test/' />);

    let textInput = await screen.findByLabelText('Username', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    expect(textInput).not.toHaveAttribute('required');

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("Submiting blank value when there is a default set", async () => {
    renderWithProviders(<TestPage url='/test/char_field_default_test/' />);

    let textInput = await screen.findByLabelText('Username', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    expect(textInput).not.toHaveAttribute('required');
    expect(textInput).not.toHaveAttribute('value', '');

    act(() => {
        fireEvent.change(textInput, { target: { value: '' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be blank.', { selector: 'p' })).toBeNull());
});


test("Renders textarea", async () => {
    renderWithProviders(<TestPage url='/test/textarea_field_test/' />);

    let textInput = await screen.findByLabelText('Bio', { selector: 'textarea' });

    expect(textInput).not.toBeNull();
});


test("Email validation with EmailField", async () => {
    renderWithProviders(<TestPage url='/test/email_field_test/' />);

    let emailInput = await screen.findByLabelText('Email', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid email
    act(() => {
        fireEvent.change(emailInput, { target: { value: 'invalid email' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid email address.', { selector: 'p' })).not.toBeNull());

    // valid email
    act(() => {
        fireEvent.click(emailInput);
        fireEvent.change(emailInput, { target: { value: 'valid@email.com' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid email address.', { selector: 'p' })).toBeNull());
});


test("String validation with RegexField", async () => {
    renderWithProviders(<TestPage url='/test/regex_field_test/' />);

    let regexInput = await screen.findByLabelText('Regex', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid email
    act(() => {
        fireEvent.change(regexInput, { target: { value: 'invalid email' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('This value does not match the required pattern.', { selector: 'p' })).not.toBeNull());

    // valid email
    act(() => {
        fireEvent.click(regexInput);
        fireEvent.change(regexInput, { target: { value: 'valid@email.com' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This value does not match the required pattern. ', { selector: 'p' })).toBeNull());
});


test("Slug validation with SlugField", async () => {
    renderWithProviders(<TestPage url='/test/slug_field_test/' />);

    let slugInput = await screen.findByLabelText('Slug', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid slug
    act(() => {
        fireEvent.change(slugInput, { target: { value: 'invalid/slug' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid "slug" consisting of letters, numbers, underscores or hyphens.', { selector: 'p' })).not.toBeNull());


    // valid slug
    act(() => {
        fireEvent.click(slugInput);
        fireEvent.change(slugInput, { target: { value: 'valid-slug' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid "slug" consisting of letters, numbers, underscores or hyphens.', { selector: 'p' })).toBeNull());
});


test("URL validation with URLField", async () => {
    renderWithProviders(<TestPage url='/test/url_field_test/' />);

    let urlInput = await screen.findByLabelText('Url', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid url
    act(() => {
        fireEvent.change(urlInput, { target: { value: 'invalid url' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid URL.', { selector: 'p' })).not.toBeNull());


    // valid url
    act(() => {
        fireEvent.click(urlInput);
        fireEvent.change(urlInput, { target: { value: 'http://localhost/valid/url/' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid URL.', { selector: 'p' })).toBeNull());
});


test("UUID validation with UUIDField", async () => {
    renderWithProviders(<TestPage url='/test/uuid_field_test/' />);

    let uuidInput = await screen.findByLabelText('Uuid', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid uuid
    act(() => {
        fireEvent.change(uuidInput, { target: { value: 'invalid uuid' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('Must be a valid UUID.', { selector: 'p' })).not.toBeNull());


    // valid uuid
    act(() => {
        fireEvent.click(uuidInput);
        fireEvent.change(uuidInput, { target: { value: '123e4567-e89b-12d3-a456-426614174000' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Must be a valid UUID.', { selector: 'p' })).toBeNull());
});


test("IP address validation with IPAddressField", async () => {
    renderWithProviders(<TestPage url='/test/ip_address_filed_test/' />);

    let ipInput = await screen.findByLabelText('Ip address', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid ip
    act(() => {
        fireEvent.change(ipInput, { target: { value: 'invalid ip' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid IPv4 or IPv6 address.', { selector: 'p' })).not.toBeNull());


    // valid ip
    act(() => {
        fireEvent.click(ipInput);
        fireEvent.change(ipInput, { target: { value: '127.0.0.1' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Enter a valid IPv4 or IPv6 address.', { selector: 'p' })).toBeNull());
});


test("Integer validation with IntegerField", async () => {
    renderWithProviders(<TestPage url='/test/integer_field_test/' />);

    let integerField = await screen.findByLabelText('Int', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid int
    act(() => {
        fireEvent.change(integerField, { target: { value: '10.5' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('A valid integer is required.', { selector: 'p' })).not.toBeNull());


    // valid int
    act(() => {
        fireEvent.click(integerField);
        fireEvent.change(integerField, { target: { value: '10' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('A valid integer is required.', { selector: 'p' })).toBeNull());
});


test("Float validation with FloatField", async () => {
    renderWithProviders(<TestPage url='/test/float_field_test/' />);

    let FloatField = await screen.findByLabelText('Float', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // valid float
    act(() => {
        fireEvent.click(FloatField);
        fireEvent.change(FloatField, { target: { value: '5.12' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
});


test("Decimal validation with DecimalField", async () => {
    renderWithProviders(<TestPage url='/test/decimal_field_test/' />);

    let decimalField = await screen.findByLabelText('Decimal', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid decimal
    act(() => {
        fireEvent.change(decimalField, { target: { value: '999.999' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('Ensure that there are no more than 5 digits in total.', { selector: 'p' })).not.toBeNull());


    // valid decimal
    act(() => {
        fireEvent.click(decimalField);
        fireEvent.change(decimalField, { target: { value: '999.99' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Ensure that there are no more than 5 digits in total.', { selector: 'p' })).toBeNull());
});


test("JSON validation with JSONField", async () => {
    renderWithProviders(<TestPage url='/test/json_field_test/' />);

    let jsonField = await screen.findByLabelText('Json', { selector: 'textarea' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    // invalid json
    act(() => {
        fireEvent.change(jsonField, { target: { value: 'invlaid' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('Value must be valid JSON.', { selector: 'p' })).not.toBeNull());

    // valid json
    act(() => {
        fireEvent.click(jsonField);
        fireEvent.change(jsonField, { target: { value: '{"valid": "json"}' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Value must be valid JSON.', { selector: 'p' })).toBeNull());
});
