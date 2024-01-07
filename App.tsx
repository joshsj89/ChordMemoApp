import { useState } from 'react';
import Navigation from './Navigation';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './components/ThemeContext';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';

SplashScreen.preventAutoHideAsync();

function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    setTimeout(async () => {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
    }, 3000);

    if (!appIsReady) {
        return null;
    }

    return (
        <ThemeProvider>
            <AutocompleteDropdownContextProvider>
                <Navigation />
            </AutocompleteDropdownContextProvider>
        </ThemeProvider>
    );
}

export default App;