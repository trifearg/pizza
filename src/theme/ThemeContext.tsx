import { createTheme, ThemeProvider } from '@mui/material';
import { createContext, FunctionComponent, useMemo, useState } from 'react';

interface IThemeContext {
    modeTheme: boolean;
    toggleColorMode: () => void;
}

export const ColorModeContext = createContext<IThemeContext>({ modeTheme: false, toggleColorMode: () => {} });

const ThemeContext: FunctionComponent = ({ children }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
            modeTheme: mode === 'light' ? false : true,
        }),
        [mode]
    );

    const theme = useMemo(
        () =>
            createTheme({
                typography: {
                    fontFamily: ['Montserrat', 'sans-serif'].join(','),
                },
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default ThemeContext;
