import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LongPressGestureHandlerEvent, State } from 'react-native-gesture-handler';

/*
const songs = [
    {
        id: '1',
        title: 'Song 1',
        artist: 'Artist 1',
        genres: ['Rock', 'Pop'],
        sections: [
            { sectionTitle: 'Verse', key: 'C Major', chords: ['I', 'IV', 'V'] },
            { sectionTitle: 'Chorus', key: 'C Major', chords: ['I', 'V'] }
        ]
    },
    {
        id: '2',
        title: 'Song 1',
        artist: 'Artist 1',
        genres: ['Rock', 'Pop'],
        sections: [
            { sectionTitle: 'Verse', key: 'C Major', chords: ['I', 'IV', 'V'] },
            { sectionTitle: 'Chorus', key: 'C Major', chords: ['I', 'V'] }
        ]
    }
]
*/

function HomeScreen({ navigation }) {
    const [songs, setSongs] = useState([]);
    const { navigate } = useNavigation();

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const savedSongs = await AsyncStorage.getItem('songs');
                if (savedSongs != null) {
                    setSongs(JSON.parse(savedSongs));
                }
            } catch (error) {
                console.error('Error loading songs:', error);
            }
        }

        const unsubscribe = navigation.addListener('focus', loadSongs); // This is the key to refreshing the list when navigating back to the HomeScreen

        return () => unsubscribe();
        
    }, [navigation]);


    const addSong = async (song) => {
        try {
            const updatedSongs = [...songs, song];
            setSongs(updatedSongs);
            await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
            console.log('Song saved successfully');
        } catch (error) {
            console.error('Error saving song:', error);
        }
    }

    const deleteSong = async (songId) => {
        try {
            const updatedSongs = songs.filter((song) => song.id !== songId);
            setSongs(updatedSongs);
            await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
            console.log('Song deleted successfully');
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }

    return (
        <View>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SongDetails', { song: item })}
                        style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
                    >
                        <Text>{item.title}</Text>
                        <Text>{item.artist}</Text>
                    </TouchableOpacity>
                )}
            />
            <FAB 
                style={{ position: 'absolute', right: 0, top: 600 }}
                icon="plus"
                onPress={() => navigate('AddSong')}
            />

        </View>
    );
}

export default HomeScreen;