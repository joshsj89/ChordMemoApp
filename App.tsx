import { useState } from 'react';
import Navigation from './Navigation';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './components/ThemeContext';
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';

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
                <KeyboardAvoidingView style={{ flex: 1 }} behavior='height' enabled>
                    <Navigation />
                </KeyboardAvoidingView>
                </SafeAreaView>
            </AutocompleteDropdownContextProvider>
        </ThemeProvider>
    );
}

export default App;