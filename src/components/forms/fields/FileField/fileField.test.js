import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


let file;


beforeEach(() => {
    file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
});


test("FileField submitting valid file.", async () => {
    renderWithProviders(<TestPage url='/test/file_field_test/' />);

    let fileInput = await screen.findByTestId('file-field-input');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(fileInput, { target: { files: [file] } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("FileField submitting null when allow null = True .", async () => {
    renderWithProviders(<TestPage url='/test/file_field_null_test/' />);

    let fileInput = await screen.findByTestId('file-field-input');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('The submitted data was not a file. Check the encoding type on the form.', { selector: 'p' })).not.toBeNull());
});


test("FileField submitting null when default is set.", async () => {
    renderWithProviders(<TestPage url='/test/file_field_default_test/' />);

    let fileInput = await screen.findByTestId('file-field-input');
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('The submitted data was not a file. Check the encoding type on the form.', { selector: 'p' })).toBeNull());
});
