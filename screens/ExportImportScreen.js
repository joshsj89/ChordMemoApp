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

                const parsedSongs = JSON.parse(savedSongs);
                await FileSystem.writeAsStringAsync(filePath, JSON.stringify(parsedSongs, null, 4));
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
            // find if there's a way to decrypt (in a sense)

            const fileName = 'songs.json';
            const filePath = FileSystem.documentDirectory + fileName;

            const importedSongs = await FileSystem.readAsStringAsync(filePath);
            if (importedSongs != null && importedSongs != '[]') {
                const savedSongs = await AsyncStorage.getItem('songs');
                const updatedSongs = savedSongs ? JSON.parse(savedSongs) : [];
                const parsedImportedSongs = JSON.parse(importedSongs);
                parsedImportedSongs.forEach((song) => {
                    // if song ID doesn't  already exist in updatedSongs, add it
                    if (!updatedSongs.some((s) => s.id === song.id)) {
                        updatedSongs.push(song);
                    }
                })

                await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
                alert('Importing songs...');
            } else {
                //Tell user that there are no songs
                alert('There are no songs to import.');
                //but also check when .getItem() returns null
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