import React, { useState } from 'react';
import Navigation from './Navigation';
import * as SplashScreen from 'expo-splash-screen';
import { ThemeProvider } from './components/ThemeContext';

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
            <Navigation />
        </ThemeProvider>
    );
}

export default App;