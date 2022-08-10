import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


test("listField submitting list when there is no child field", async () => {
    renderWithProviders(<TestPage url='/test/list_field_no_child_test/' />);

    let textInput = await screen.findByLabelText('Scores', { selector: 'textarea' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(textInput, { target: { value: '[1, 2, 3]' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Expected a list of items but got type "str".', { selector: 'p' })).toBeNull());
});


test("ListField submitting null when default is set", async () => {
    renderWithProviders(<TestPage url='/test/list_field_default_test/' />);

    await screen.findByLabelText('Scores', { selector: 'textarea' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});


test("DictField submitting a Dict when there is no child field", async () => {
    renderWithProviders(<TestPage url='/test/dict_field_no_child_test/' />);

    let textInput = await screen.findByLabelText('Config', { selector: 'textarea' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(textInput, { target: { value: '{"username": "admin"}' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('Expected a list of items but got type "str".', { selector: 'p' })).toBeNull());
});


test("DictField submitting null when default is set", async () => {
    renderWithProviders(<TestPage url='/test/dict_field_default_test/' />);

    await screen.findByLabelText('Config', { selector: 'textarea' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});


