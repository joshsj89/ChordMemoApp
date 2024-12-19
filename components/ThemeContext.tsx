import React, { useContext, useEffect, useState } from 'react';
import { saveDarkModePreference, loadDarkModePreference } from './darkModeHelperFunctions';

// Using React Context API to avoid prop drilling


// Create two contexts: one for the state and one for the function, 
// allowing for separation of concerns and avoiding unnecessary re-renders
const ThemeContext = React.createContext(true); // for state
const ThemeUpdateContext = React.createContext(() => { }); // for function


// Custom hooks to use the contexts
export function useTheme() { // allows for the use of the darkMode state
    return useContext(ThemeContext);
}

export function useThemeUpdate() { // allows for the use of the toggleDarkMode function
    return useContext(ThemeUpdateContext);
}

// Provider component to wrap the entire app
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