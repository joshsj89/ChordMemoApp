import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

    useEffect(() => {
        loadSongs();
    }, []);

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
        </View>
    );
}

export default HomeScreen;