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


test("DateTimeField with iso-8601 format", async () => {
    renderWithProviders(<TestPage url='/test/datetime_field_test/' />);

    let dateTimeField = await screen.findByLabelText('Datetime', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });


    act(() => {
        fireEvent.change(dateTimeField, { target: { value: '08/11/2022 02:10 am' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("DateTimeField without iso-8601 format", async () => {
    renderWithProviders(<TestPage url='/test/datetime_field_input_format_test/' />);

    let dateTimeField = await screen.findByLabelText('Datetime', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });


    act(() => {
        fireEvent.change(dateTimeField, { target: { value: '2006-10-25 14:30' } });
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("DateTimeField submitting null when allow_null=True", async () => {
    renderWithProviders(<TestPage url='/test/datetime_field_null_test/' />);

    let dateTimeField = await screen.findByLabelText('Datetime', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });


    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});


test("DateTimeField submitting null when default is set", async () => {
    renderWithProviders(<TestPage url='/test/datetime_field_null_test/' />);

    let dateTimeField = await screen.findByLabelText('Datetime', { selector: 'input' });
    let submitButton = await screen.findByText('submit', { type: 'submit' });


    act(() => {
        fireEvent.click(submitButton);
    });

    await waitFor(() => expect(screen.queryByText('200', { selector: 'h6' })).not.toBeNull());
    await waitFor(() => expect(screen.queryByText('This field may not be null.', { selector: 'p' })).toBeNull());
});
