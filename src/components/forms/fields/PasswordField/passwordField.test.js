import '@testing-library/jest-dom';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';
import { renderWithProviders } from "../../../utils/testUtils/test-utils";
import TestPage from "../../TestPage";

test("Switching type from password to text", async () => {

    renderWithProviders(<TestPage url='/test/password_field_test/' />);

    let passwordInput = await screen.findByLabelText('Password', { selector: 'input' });
    let eyeButton = await screen.findByTestId('password-field-switch-input-type', { selector: 'button' });

    expect(passwordInput).toHaveAttribute('type', 'password');

    act(() => {
        fireEvent.click(eyeButton);
    });

    expect(passwordInput).toHaveAttribute('type', 'text');
});
