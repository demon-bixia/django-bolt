import '@testing-library/jest-dom';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


test("ListField submitting integer list", async () => {
    renderWithProviders(<TestPage url='/test/list_field_test/' />);

    let input_1 = await screen.findByTestId('list-field-input-1');
    let addButton = await screen.findByTestId('list-field-add-button');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(input_1, { target: { value: '1' } });
        fireEvent.click(addButton);
    });

    let input_2 = await screen.findByTestId('list-field-input-2');

    act(() => {
        fireEvent.change(input_2, { target: { value: 1 } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});

test("ListField submitting null when allow null = True", async () => {
    renderWithProviders(<TestPage url='/test/list_field_null_test/' />);

    await screen.findByTestId('list-field-input-1');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
});
