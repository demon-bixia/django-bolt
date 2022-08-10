import { CssBaseline, ThemeProvider } from "@mui/material";

import { Route, Routes } from "react-router-dom";

import NotFoundError from "./components/errors/NotFoundError";
import ChangeListPage from "./components/pages/ChangeListPage"
import HomePage from "./components/pages/HomePage"
import IndexPage from "./components/pages/IndexPage"
import LoginPage from "./components/pages/LoginPage"

import AuthProvider from "./components/authentication/AuthProvider";
import AuthRoutes from "./components/authentication/routes/AuthRoutes";
import ProtectedRoutes from "./components/authentication/routes/ProtectedRoutes";

import TestPage from "./components/forms/TestPage";

import { overrides } from "./application/theme";

// Core features:
// round 1
// todo finish the change list page.
// todo create the add/change pages.

// round 2
// todo create the admin activity/history page.

// Optimizations:
// todo optimize error handling.
// todo optimize customization from server and theme overriding.
// todo optimize accessibility.
// todo clean code and add more comments.

// Future features:
// idea rtl support
// idea add dashboard and widgets support (e.g charts, lists, bookmarks).
// idea markdown documentation support.

const App = () => {

    return (<div className="App">
        <ThemeProvider theme={overrides}>
            <CssBaseline />
            <AuthProvider>
                <Routes>
                    <Route element={<AuthRoutes />}>
                        <Route path="/login" element={<LoginPage />} />
                    </Route>

                    <Route element={<ProtectedRoutes />}>
                        <Route path="/" element={<IndexPage />}>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/:appLabel/:modelName/changelist/' element={<ChangeListPage />} />
                        </Route>
                    </Route>

                    <Route path='new_dynamic_form/test/:testName' element={<TestPage />} />

                    <Route path="*" element={<NotFoundError />} />
                </Routes>
            </AuthProvider>
        </ThemeProvider>
    </div>);
};

export default App;
