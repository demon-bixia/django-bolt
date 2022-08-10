import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


test("checked checkbox", async () => {
    renderWithProviders(<TestPage url='/test/boolean_field_test/' />);

    let checkbox = await screen.findByLabelText('Is vip', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    act(() => {
        fireEvent.click(checkbox);
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.getByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field is required.', { selector: 'p' })).toBeNull());
});


test("unchecked checkbox", async () => {
    renderWithProviders(<TestPage url='/test/boolean_field_test/' />);

    let checkbox = await screen.findByLabelText('Is vip', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.getByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field is required.', { selector: 'p' })).toBeNull());
});


test("unchecked checkbox with default values", async () => {
    renderWithProviders(<TestPage url='/test/boolean_field_default_test/' />);

    let checkbox = await screen.findByLabelText('Is vip', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.getByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field is required.', { selector: 'p' })).toBeNull());
});


test("null value when using NullBooleanField", async () => {
    renderWithProviders(<TestPage url='/test/null_boolean_field_test/' />);

    let checkbox = await screen.findByLabelText('Is admin', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.getByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field is required.', { selector: 'p' })).toBeNull());
});
