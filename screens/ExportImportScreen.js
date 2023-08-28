import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from "expo-sharing";

function ExportImportScreen() {
    const exportSongs = async () => {
        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null && savedSongs != '[]') {
                const fileName = 'songs.json';
                const filePath = FileSystem.documentDirectory + fileName;

                await FileSystem.writeAsStringAsync(filePath, savedSongs);
                shareAsync(filePath);
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
            <Button title="Export" onPress={exportSongs} color="#009788" />
            <Button title="Import" onPress={importSongs} color="#009788" />
        </View>
    );
}

export default ExportImportScreen;