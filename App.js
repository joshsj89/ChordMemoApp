import React, { useState } from 'react';
import Navigation from './Navigation';
import * as SplashScreen from 'expo-splash-screen';

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

    return <Navigation />;
}

export default App;