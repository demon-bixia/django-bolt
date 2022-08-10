import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';

import { setupStore } from '../../../application/store';
import { overrides } from '../../../application/theme';

import { CssBaseline, ThemeProvider } from '@mui/material';

// renders your component inside both the theme provider and the redux store provider.
export function renderWithProviders(
    ui,
    {
        preloadedState = {},
        store = setupStore(preloadedState),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return (
            <Provider store={store}>
                <ThemeProvider theme={overrides}>
                    <CssBaseline />
                    {children}
                </ThemeProvider>
            </Provider>
        )
    }
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

