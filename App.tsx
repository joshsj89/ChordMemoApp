import { useState } from 'react';
import Navigation from './Navigation';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './components/ThemeContext';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAwareScrollView>
                    <Navigation />
                </KeyboardAwareScrollView>
            </SafeAreaView>
            </AutocompleteDropdownContextProvider>

        </ThemeProvider>
    );
}

export default App;