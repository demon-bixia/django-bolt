import { CssBaseline, ThemeProvider } from "@mui/material";

import { Route, Routes } from "react-router-dom";

import NotFoundError from "./components/errors/NotFoundError";
import ChangeListPage from "./components/pages/ChangeListPage"
import HomePage from "./components/pages/HomePage";
import IndexPage from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";

import AuthProvider from "./components/authentication/AuthProvider";
import AuthRoutes from "./components/authentication/routes/AuthRoutes";
import ProtectedRoutes from "./components/authentication/routes/ProtectedRoutes";
import ActivityPage from "./components/pages/ActivityPage";

import TestPage from "./components/forms/TestPage";

import { overrides } from "./application/theme";
import FormPage from "./components/pages/FormPage";

// Optimizations:
// todo organize color variables better.
// todo optimize error handling.
// todo optimize customization from server and theme overriding.
// todo optimize accessibility.
// todo clean code and add more comments.

// Future features:
// idea rtl support
// idea add dashboard and widgets support (e.g charts, lists, bookmarks).
// idea markdown documentation support.
// idea add changelist editing.
// idea add date hierarchy.

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
                            <Route path='/Activity/' element={<ActivityPage />} />
                            <Route path='/Activity/:objectId/' element={<ActivityPage />} />
                            <Route path='/:appLabel/:modelName/:action/' element={<FormPage />} />
                            <Route path='/:appLabel/:modelName/:objectId/:action/' element={<FormPage />} />
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
