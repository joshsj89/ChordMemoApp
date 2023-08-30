import { Button, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from "expo-sharing";
import * as DocumentPicker from 'expo-document-picker';

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
            
            const importResult = await DocumentPicker.getDocumentAsync({
                type: 'application/json',
                copyToCacheDirectory: true,
                multiple: false,
            });

            const importedSongs = !importResult.canceled ? await FileSystem.readAsStringAsync(importResult.assets[0].uri): null;

            // find if there's a way to decrypt (in a sense)
            
            if (importedSongs != null && importedSongs != '[]') {
                const savedSongs = await AsyncStorage.getItem('songs');
                const updatedSongs = savedSongs ? JSON.parse(savedSongs) : [];
                const parsedImportedSongs = JSON.parse(importedSongs);
                parsedImportedSongs.forEach((song) => {
                    // if song ID doesn't  already exist in updatedSongs, add it
                    if (!updatedSongs.some((s) => s.id === song.id)) {
                        updatedSongs.push(song);
                    }
                });

                await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
                
                if (importResult) {
                    alert(`"${importResult.assets[0].name}" imported successfully.`);
                } else {
                    alert('File import failed.');
                }
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