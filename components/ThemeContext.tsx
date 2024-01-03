import React, { useContext, useEffect, useState } from 'react';
import { saveDarkModePreference, loadDarkModePreference } from './darkModeHelperFunctions';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export function useThemeUpdate() {
    return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        saveDarkModePreference(newDarkMode);
    }

    useEffect(() => {
        const loadDarkMode = async () => {
            const darkModePreference = await loadDarkModePreference();
            setDarkMode(darkModePreference);
        }

        loadDarkMode();
    }, [])

    return (
        <ThemeContext.Provider value={darkMode}>
            <ThemeUpdateContext.Provider value={toggleDarkMode}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    );
}