import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Button, View } from "react-native";


function ExportImportScreen() {
    const exportSongs = async () => {
        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                // export savedSongs
                alert('Exporting songs...');
                // find if there's a way to encrypt (in a sense)
            } else {
                //Tell user that there are no songs
                alert('There are no songs to export.');
                //but also check when .getItem() returns null
            }
        } catch (error) {
            console.error('Error loading songs:', error);
        }
    }

    const importSongs = async () => {
        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                //
            } else {
                //
            }
        } catch (error) {
            console.error('Error loading songs:', error);
        }
    }

    return (
        <View>
            <Button title="Export" onPress={exportSongs} />
            <Button title="Import" onPress={importSongs} />
        </View>
    );
}

export default ExportImportScreen;