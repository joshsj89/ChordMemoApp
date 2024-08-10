import { Button, StyleSheet, View, Text, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from "expo-sharing";
import * as DocumentPicker from 'expo-document-picker';
import { useTheme } from "../components/ThemeContext";

function ExportImportScreen() {
    const darkMode = useTheme();

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
                const savedSongs: string | null = await AsyncStorage.getItem('songs');
                const updatedSongs: Song[] = savedSongs ? JSON.parse(savedSongs) : [];
                const parsedImportedSongs: Song[] = JSON.parse(importedSongs);
                parsedImportedSongs.forEach((song) => {
                    // if song ID doesn't already exist in updatedSongs, add it
                    if (!updatedSongs.some((s) => s.id === song.id)) {
                        updatedSongs.push(song);
                    }
                });

                await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
                
                if (importResult.assets) {
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
        <View style={!darkMode ? styles.container : stylesDark.container}>
            <Text style={!darkMode ? styles.header : stylesDark.header}>Export/Import Songs</Text>
            <View style={{ marginBottom: 20 }}>
                <Text style={!darkMode ? styles.description : stylesDark.description}>
                    <Text style={!darkMode ? styles.boldText : stylesDark.boldText}>Export Your Songs as JSON:</Text> This feature allows you to export all your saved songs into a JSON file. Once exported, you can easily share this file with yourself or others by various means, such as email or messaging apps. To access your exported songs, simply download the JSON file outside of the app.
                </Text>
                {Platform.OS === 'android' && <Button title="Export" onPress={exportSongs} color="#009788" />}
                {Platform.OS === 'ios' && (
                    <View style={{ backgroundColor: '#009788' }}>
                        <Button title="Export" onPress={exportSongs} color="white" />
                    </View>
                )}
            </View>
            <View style={{ marginBottom: 20 }}>
                <Text style={!darkMode ? styles.description : stylesDark.description}>
                    <Text style={!darkMode ? styles.boldText : stylesDark.boldText}>Import Songs from JSON File:</Text> With this option, you can import songs from a JSON file stored anywhere on your device. Whether the file is in your downloads folder or a specific directory, you can select and import it here. This makes it convenient to add new songs or restore your previously exported songs.
                </Text>
                {Platform.OS === 'android' && <Button title="Import" onPress={importSongs} color="#009788" />}
                {Platform.OS === 'ios' && (
                    <View style={{ backgroundColor: '#009788' }}>
                        <Button title="Import" onPress={importSongs} color="white" />
                    </View>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    description: {
        fontSize: 16,
        marginBottom: 10
    },
    boldText: {
        fontWeight: 'bold'
    }
});

const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#171717'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#FAFAFF'
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#FAFAFF'
    },
    boldText: {
        fontWeight: 'bold',
        color: '#FAFAFF'
    }
});

export default ExportImportScreen;