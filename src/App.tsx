import AppRoutes from './AppRoutes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme/defaultTheme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import ContextProvider from './context/ContextProvider';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <ContextProvider>
        <CssBaseline />
        <AppRoutes />
      </ContextProvider>
    </ThemeProvider>
  );
}

export default App;
