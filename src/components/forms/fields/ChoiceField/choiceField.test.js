import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor, within } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


test("Select using choice field", async () => {
    renderWithProviders(<TestPage url='/test/choice_field_test/' />);

    let choiceInput = await screen.findByLabelText('Choice', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    expect(choiceInput).toHaveAttribute('required');

    // valid choice
    act(() => {
        fireEvent.change(choiceInput, { target: { value: '1' } })
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("Submitting null values when allow_null = true", async () => {
    renderWithProviders(<TestPage url='/test/choice_field_null_test/' />);

    let choiceInput = await screen.findByLabelText('Choice', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    expect(choiceInput).toHaveAttribute('required');

    // null value
    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("Submitting null values when default is set", async () => {
    renderWithProviders(<TestPage url='/test/choice_field_default_test/' />);

    let choiceInput = await screen.findByLabelText('Choice', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { selector: 'button' });

    expect(choiceInput).toHaveAttribute('required');

    // null value
    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6 ' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});
