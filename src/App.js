import {ThemeProvider} from '@mui/material/styles';
import {overrides} from "./theme";
import CssBaseline from "@mui/material/CssBaseline";
import DynamicForm from "./components/DynamicForm/DynamicForm";

function App() {

    return (
        <div className="App">
            <ThemeProvider theme={overrides}>
                <CssBaseline/>
                <DynamicForm/>
            </ThemeProvider>
        </div>
    );
}

export default App;
