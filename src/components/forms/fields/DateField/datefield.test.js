import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";


beforeAll(() => {
    // add window.matchMedia
    // this is necessary for the date picker to be rendered in desktop mode.
    // if this is not provided, the mobile mode is rendered, which might lead to unexpected behavior
    Object.defineProperty(window, "matchMedia", {
        writable: true,

        value: (query) => ({
            media: query,
            // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
            matches: query === "(pointer: fine)",
            onchange: () => { },
            addEventListener: () => { },
            removeEventListener: () => { },
            addListener: () => { },
            removeListener: () => { },
            dispatchEvent: () => false,
        }),
    });
});


afterAll(() => {
    delete window.matchMedia;
});


test("DateField with iso-8601 format", async () => {
    renderWithProviders(<TestPage url='/test/date_field_test/' />);

    let dateInput = await screen.findByLabelText('Date', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(dateInput, { target: { value: '08/09/2022' } })
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("DateField without iso-8601 format", async () => {
    renderWithProviders(<TestPage url='/test/date_field_input_format_test/' />);

    let dateInput = await screen.findByLabelText('Date', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.change(dateInput, { target: { value: '10/25/2006' } })
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('button', { type: 'button' })).toBeNull());
    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("DateField submitting null when allow_null=True", async () => {
    renderWithProviders(<TestPage url='/test/date_field_null_test/' />);

    let dateInput = await screen.findByLabelText('Date', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("DateField submitting null when default is set", async () => {
    renderWithProviders(<TestPage url='/test/date_field_default_test/' />);

    let dateInput = await screen.findByLabelText('Date', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });

    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});
