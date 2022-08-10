import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


test("DictField submitting a valid dict of key and value", async () => {
    renderWithProviders(<TestPage url='/test/dict_field_test/' />);

    let key_1 = await screen.findByTestId('dict-field-key-1');
    let value_1 = await screen.findByTestId('dict-field-value-1')
    let addButton = await screen.findByTestId('dict-field-add-button');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(key_1, { target: { value: 'username' } });
        fireEvent.change(value_1, { target: { value: 'admin' } });
        fireEvent.click(addButton);
    });

    let key_2 = await screen.findByTestId('dict-field-key-2');
    let value_2 = await screen.findByTestId('dict-field-value-2')
    let saveButton = await screen.findByTestId('dict-field-save-button');

    act(() => {
        fireEvent.change(key_2, { target: { value: 'password' } });
        fireEvent.change(value_2, { target: { value: 'password' } });
        fireEvent.click(saveButton);
    });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});


test("DictField error when trying to save duplicate keys", async () => {
    renderWithProviders(<TestPage url='/test/dict_field_test/' />);

    let key_1 = await screen.findByTestId('dict-field-key-1');
    let value_1 = await screen.findByTestId('dict-field-value-1')
    let addButton = await screen.findByTestId('dict-field-add-button');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(key_1, { target: { value: 'username' } });
        fireEvent.change(value_1, { target: { value: 'admin' } });
        fireEvent.click(addButton);
    });

    let key_2 = await screen.findByTestId('dict-field-key-2');
    let value_2 = await screen.findByTestId('dict-field-value-2')
    let saveButton = await screen.findByTestId('dict-field-save-button');

    act(() => {
        fireEvent.change(key_2, { target: { value: 'username' } });
        fireEvent.change(value_2, { target: { value: 'worker' } });
        fireEvent.click(saveButton);
    });

    await waitFor(() => expect(screen.queryByText('This key is duplicated, keys must be unique.', { selector: 'p' })).not.toBeNull());

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});

test("DictField submitting null when allow_null=True", async () => {
    renderWithProviders(<TestPage url='/test/dict_field_null_test/' />);

    await screen.findByTestId('dict-field-key-1');
    await screen.findByTestId('dict-field-value-1')
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});

test("HstoreField ", async () => {
    renderWithProviders(<TestPage url='/test/hstore_field_test/' />);
    let key_1 = await screen.findByTestId('dict-field-key-1');
    let value_1 = await screen.findByTestId('dict-field-value-1')
    let addButton = await screen.findByTestId('dict-field-add-button');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(key_1, { target: { value: 'username' } });
        fireEvent.change(value_1, { target: { value: 'admin' } });
        fireEvent.click(addButton);
    });

    let key_2 = await screen.findByTestId('dict-field-key-2');
    let value_2 = await screen.findByTestId('dict-field-value-2')
    let saveButton = await screen.findByTestId('dict-field-save-button');

    act(() => {
        fireEvent.change(key_2, { target: { value: 'password' } });
        fireEvent.change(value_2, { target: { value: 'password' } });
        fireEvent.click(saveButton);
    });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});
