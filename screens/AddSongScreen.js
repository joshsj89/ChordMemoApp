import React, { useState } from 'react';
import { View, ScrollView, Text, TextInput, Button } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { sectionTypeOptions, keyTonicOptions, keySymbolOptions, keyModeOptions, genreOptions } from '../options';

function AddSongScreen() {
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');
    const [genres, setGenres] = useState([]);
    const [sections, setSections] = useState([]);
    const [sectionTitle, setSectionTitle] = useState('');
    const [keyTonic, setKeyTonic] = useState('');
    const [keySymbol, setKeySymbol] = useState('');
    const [keyMode, setKeyMode] = useState('Major');
    const [chords, setChords] = useState('');

    const { navigate } = useNavigation();

    const addGenre = () => {
        const newGenres = [...genres, ''];
        setGenres(newGenres);
    }

    const updateGenre = (index, value) => {
        const updatedGenres = [...genres];
        updatedGenres[index] = value;
        setGenres(updatedGenres);
    }

    const removeGenre = (index) => {
        const updatedGenres = [...genres];
        updatedGenres.splice(index, 1);
        setGenres(updatedGenres);
    }

    const addSection = () => {
        const newSection = { sectionTitle, keyTonic, keySymbol, keyMode, chords};
        setSections([...sections, newSection]);
    }

    const updateSection = (index, key, value) => {
        const updatedSections = [...sections];
        updatedSections[index][key] = value;
        setSections(updatedSections);
    }

    const removeSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    }

    const addSong = async () => {
        try {
            const newSong = {
                id: Date.now().toString(),
                title,
                artist,
                genres: genres.filter((genre) => genre.trim() !== ''),
                sections: sections.map((section) => {
                    return {
                        sectionTitle: section.sectionTitle,
                        key: {
                            tonic: section.keyTonic,
                            symbol: section.keySymbol,
                            mode: section.keyMode
                        },
                        chords: section.chords.trim()
                    };
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
        <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, backgroundColor: '#fff' }}>
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
            <Button title='Add Genre'onPress={addGenre} />
            {genres.length !== 0 && (
                <ScrollView horizontal style={{ flexDirection: 'row', marginVertical: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                    {genres.map((genre, index) => (
                        <View key={index}>
                            <Picker
                                selectedValue={genre}
                                style={{ height: 50, width: 120 }}
                                onValueChange={(itemValue) => updateGenre(index, itemValue)}
                            >
                                {genreOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                        </View>
                    ))}
                </ScrollView>)}
            <Button title="Add Section" onPress={addSection} />
            {sections.map((section, index) => (
                <ScrollView horizontal key={index} style={{ flexDirection: 'row', marginVertical: 10, padding: 10, borderWidth: 1, borderColor: '#ccc' }}>
                    <Picker
                        selectedValue={section.sectionTitle}
                        style={{ height: 50, width: 150 }}
                        onValueChange={(itemValue) => updateSection(index, 'sectionTitle', itemValue)}
                    >
                        {sectionTypeOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={section.keyTonic}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue) => updateSection(index, 'keyTonic', itemValue)}
                    >
                        {keyTonicOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={section.keySymbol}
                        style={{ height: 50, width: 100 }}
                        onValueChange={(itemValue) => updateSection(index, 'keySymbol', itemValue)}
                    >
                        {keySymbolOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                    <Picker
                        selectedValue={section.keyMode}
                        style={{ height: 50, width: 125 }}
                        onValueChange={(itemValue) => updateSection(index, 'keyMode', itemValue)}
                    >
                        {keyModeOptions.map((option) => (
                            <Picker.Item key={option.value} label={option.label} value={option.value} />
                        ))}
                    </Picker>
                    <TextInput
                        style={{ fontSize: 16, height: 50, padding: 10, borderWidth: 1, borderColor: '#ccc', marginRight: 20 }}
                        placeholder='Chords (space-separated)'
                        value={section.chords}
                        onChangeText={(text) => updateSection(index, 'chords', text)}
                    />
                    {/* <Button title="Remove Section" onPress={() => removeSection(index)} /> */}
                </ScrollView>
            ))}
            <View style={{ padding: 20, marginBottom: 20 }}>
                <Button 
                    title="Add Song"
                    disabled={!title || !sections.length}
                    onPress={addSong} 
                />
            </View>
        </ScrollView>
    );
}

export default AddSongScreen;