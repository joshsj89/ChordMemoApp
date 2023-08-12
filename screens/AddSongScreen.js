import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function AddSongScreen() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genres, setGenres] = useState('');
    const [sections, setSections] = useState('');

    const { navigate } = useNavigation();

    const addSong = async () => {
        try {
            const newSong = {
                id: Date.now().toString(),
                title,
                artist,
                genres: genres.split(',').map((genre) => genre.trim()),
                sections: sections.split(';').map((section) => {
                    const [sectionTitle, key, chords] = section.split(',').map((item) => item.trim());
                    return { sectionTitle, key, chords: chords.split(' ') };
                })
            };

            const savedSongs = await AsyncStorage.getItem('songs');
            const updatedSongs = savedSongs ? JSON.parse(savedSongs) : [];
            updatedSongs.push(newSong);

            await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));

            navigate('Home');
        } catch (error) {
            console.error('Error adding song:', error);
        }
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Add Song</Text>
            <TextInput
                style={{ fontSize: 16, padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc' }}
                placeholder="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={{ fontSize: 16, padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc' }}
                placeholder='Artist'
                value={artist}
                onChangeText={(text) => setArtist(text)}
            />
            <TextInput
                style={{ fontSize: 16, padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc' }}
                placeholder='Genres (comma-separated)'
                value={genres}
                onChangeText={(text) => setGenres(text)}
            />
            <TextInput
                style={{ fontSize: 16, padding: 10, marginVertical: 10, borderWidth: 1, borderColor: '#ccc' }}
                placeholder='Sections (sectionTitle, key, chords; sectionTitle, key, chords; ...)'
                value={sections}
                onChangeText={(text) => setSections(text)}
            />
            <Button title="Add Song" onPress={addSong} />
        </View>
    );
}

export default AddSongScreen;