import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';
import { HomeScreenNavigationProp } from '../types/screens';

function HomeScreen({ navigation }) {
    const [songs, setSongs] = useState<Song[]>([]);
    const { navigate } = useNavigation<HomeScreenNavigationProp>();

    const darkMode = useTheme();

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const savedSongs = await AsyncStorage.getItem('songs');
                if (savedSongs != null) {
                    const parsedSongs: Song[] = JSON.parse(savedSongs);
                    setSongs(parsedSongs);
                }
            } catch (error) {
                console.error('Error loading songs:', error);
            }
        }

        const unsubscribe = navigation.addListener('focus', loadSongs); // This is the key to refreshing the list when navigating back to the HomeScreen

        return () => unsubscribe();
        
    }, [navigation]);

    const deleteSong = async (songId: string) => {
        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                const updatedSongs: Song[] = JSON.parse(savedSongs).filter((s: Song) => s.id !== songId);
                await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));

                setSongs(updatedSongs); // Update the state to reflect the deletion
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }

    const confirmDelete = (song: Song) => {
        Alert.alert(
            'Confirm Deletion',
            `Are you sure you want to delete "${song.title}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Delete', style: 'destructive', onPress: () => deleteSong(song.id)}
            ],
            { cancelable: true }
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: !darkMode ? "#F2F2F2" : "#171717" }}>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SongDetails', { song: item })}
                        onLongPress={() => confirmDelete(item)}
                        style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
                    >
                        <Text style={{ color: !darkMode ? 'black' : '#FAFAFF', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                        <Text style={{ color: !darkMode ? 'black' : '#99999E' }}>{item.artist}</Text>
                    </TouchableOpacity>
                )}
            />
            <FAB 
                style={{ position: 'absolute', right: 5, bottom: 10, backgroundColor: '#009788' }}
                color={!darkMode ? "white" : "#171717"}
                icon="plus"
                onPress={() => navigate('AddSong')}
            />
        </View>
    );
}

export default HomeScreen;