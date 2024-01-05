import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { sectionTypeOptions, keyTonicOptions, keySymbolOptions, keyModeOptions, genreOptions } from '../options';
import { CheckBox } from 'react-native-btr';
import { useTheme } from '../components/ThemeContext';
import SymbolPickerModal from '../components/SymbolPickerModal';
import { EditSongScreenNavigationProp } from '../types/screens';

function EditSongScreen({ route }) {
    const { song } = route.params;
    const [title, setTitle] = useState(song.title);
    const [artist, setArtist] = useState(song.artist);
    const [genres, setGenres]: [any[], React.Dispatch<React.SetStateAction<any[]>>] = useState(song.genres); // putting 'any' for now
    const [sections, setSections] = useState(song.sections);
    const [sectionTitle, setSectionTitle] = useState('Verse');
    const [keyTonic, setKeyTonic] = useState('C');
    const [keySymbol, setKeySymbol] = useState('');
    const [keyMode, setKeyMode] = useState('Major');
    const [chords, setChords] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [availableGenres, setAvailableGenres] = useState(genreOptions);
    const [showSymbolPickerModal, setShowSymbolPickerModal] = useState(false);
    const [symbolPickerModalSectionIndex, setSymbolPickerModalSectionIndex]: [number | null, React.Dispatch<React.SetStateAction<number | null>>] = useState(null);

    const darkMode = useTheme();

    const { navigate } = useNavigation<EditSongScreenNavigationProp>();

    useEffect(() => {
        const usedGenres: string[] = genres.map((genre) => genre);
        const updatedAvailableGenres = genreOptions.filter((genre) => !usedGenres.includes(genre.value));
        setAvailableGenres(updatedAvailableGenres);
    }, [genres]);

    const toggleSymbolPickerModal = (index: number | null) => {
        if (index != null) {
            setSymbolPickerModalSectionIndex(index);
        }
        setShowSymbolPickerModal(prev => !prev);
    }

    const handleSymbolSelect = (symbol: Symbol) => {
        if (symbolPickerModalSectionIndex != null) {
            updateSection(symbolPickerModalSectionIndex, 'chords', sections[symbolPickerModalSectionIndex].chords + symbol);
        }
    }

    const addGenre = () => {
        if (availableGenres.length === 0) return;

        if (availableGenres.length > 0) {
            const newGenre = availableGenres[0].value;
            setGenres([...genres, newGenre]);
        }
    }

    const updateGenre = (index: number, value: string) => {
        const updatedGenres = [...genres];
        updatedGenres[index] = value;
        setGenres(updatedGenres);
    }

    const removeGenre = (index: number) => {
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

    const updateSectionKey = (index, key, value) => {
        const updatedSections = [...sections];
        updatedSections[index].key[key] = value;
        setSections(updatedSections);
    }

    const removeSection = (index) => {
        const updatedSections = [...sections];
        updatedSections.splice(index, 1);
        setSections(updatedSections);
    }

    const editSong = async () => {
        try {
            const updatedSong = {
                id: song.id,
                title: title.trim(),
                artist: artist.trim(),
                genres,
                sections: sections.map((section) => {
                    return {
                        sectionTitle: section.sectionTitle,
                        key: {
                            tonic: section.key.tonic,
                            symbol: section.key.symbol,
                            mode: section.key.mode
                        },
                        chords: section.chords.trim()
                    };
                })
            }

            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                const updatedSongs = JSON.parse(savedSongs).map((s) => {
                    if (s.id === song.id) {
                        return updatedSong;
                    } else {
                        return s;
                    }
                });
                await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
                navigate('SongDetails', { song: updatedSong });
            }
        } catch (error) {
            console.error('Error updating song:', error);
        }
    }

    return (
        <ScrollView style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10, backgroundColor: !darkMode ? '#fff' : 'black' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: !darkMode ? 'black' : 'white' }}>Edit Song</Text>
            <TextInput
                style={{ fontSize: 16, padding: 10, marginVertical: 10, color: !darkMode ? 'black' : 'white', borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white' }}
                placeholder="Title"
                placeholderTextColor='gray'
                value={title}
                onChangeText={(text) => setTitle(text)}
            />
            <TextInput
                style={{ fontSize: 16, padding: 10, marginVertical: 10, color: !darkMode ? 'black' : 'white', borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white' }}
                placeholder='Artist'
                placeholderTextColor='gray'
                value={artist}
                onChangeText={(text) => setArtist(text)}
            />
            <Button title='Add Genre'onPress={addGenre} color='#009788' />
            {genres.length !== 0 && (
                <ScrollView horizontal style={{ flexDirection: 'row', marginVertical: 10, padding: 5, borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white' }}>
                    {genres.map((genre, index) => (
                        <View key={index} style={{ borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white', marginHorizontal: 10, marginVertical: 10 }}>
                            <Picker
                                selectedValue={genre}
                                style={{ height: 50, width: 120, zIndex: 0,  color: !darkMode ? 'black' : 'white' }}
                                dropdownIconColor={!darkMode ? 'gray' : 'white'}
                                onValueChange={(itemValue) => updateGenre(index, itemValue)}
                            >
                                {genreOptions.map((option) => (
                                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                            <TouchableOpacity 
                                onPress={() => {
                                    removeGenre(index);
                                    setAvailableGenres([...availableGenres, { label: genre, value: genre }]);
                                }}
                                style={{ position: 'absolute', zIndex: 1, width: 25, height: 25, top: -10, right: -10 }}
                            >
                                <Image
                                    source={!darkMode ? require('../assets/images/remove_icon.png') : require('../assets/images/remove_icon_black.png')}
                                    style={{ width: 25, height: 25, position: 'absolute', top: 0, left: 0 }}
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>)}
            <Button title="Add Section" onPress={addSection} color='#009788' />
            {sections.length > 0 && (
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 10, justifyContent: 'space-between' }}>
                    <CheckBox
                        checked={isChecked}
                        onPress={() => setIsChecked(!isChecked)}
                        color='#009788'
                    />
                    <Text style={{ fontSize: 16, color: !darkMode ? 'black' : 'white' }}>Same Key For All Sections</Text>
                </View>
            )}
            {sections.map((section, index) => (
                <View key={index}>
                    <ScrollView horizontal style={{ flexDirection: 'row', marginVertical: 10, padding: 10, zIndex: 0, borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white' }}>
                        <Picker
                            selectedValue={section.sectionTitle}
                            style={{ height: 50, width: 150, color: !darkMode ? 'black' : 'white' }}
                            dropdownIconColor={!darkMode ? 'gray' : 'white'}
                            onValueChange={(itemValue) => updateSection(index, 'sectionTitle', itemValue)}
                        >
                            {sectionTypeOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={isChecked ? sections[0].key.tonic : section.key.tonic}
                            style={{ height: 50, width: 100, color: !darkMode ? 'black' : 'white' }}
                            dropdownIconColor={!darkMode ? 'gray' : 'white'}
                            onValueChange={(itemValue) => {
                                updateSectionKey(index, 'tonic', itemValue);
                                setKeyTonic(itemValue); // defaults new Picker to the last edited section's keyTonic
                            }}
                            enabled={isChecked && index > 0 ? false : true}
                        >
                            {keyTonicOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={isChecked ? sections[0].key.symbol : section.key.symbol}
                            style={{ height: 50, width: 100, color: !darkMode ? 'black' : 'white' }}
                            dropdownIconColor={!darkMode ? 'gray' : 'white'}
                            onValueChange={(itemValue) => {
                                updateSectionKey(index, 'symbol', itemValue);
                                setKeySymbol(itemValue); // defaults new Picker to the last edited section's keySymbol
                            }}
                            enabled={isChecked && index > 0 ? false : true}
                        >
                            {keySymbolOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={isChecked ? sections[0].key.mode : section.key.mode}
                            style={{ height: 50, width: 125, color: !darkMode ? 'black' : 'white' }}
                            dropdownIconColor={!darkMode ? 'gray' : 'white'}
                            onValueChange={(itemValue) => {
                                updateSectionKey(index, 'mode', itemValue);
                                setKeyMode(itemValue); // defaults new Picker to the last edited section's keyMode
                            }}
                            enabled={isChecked && index > 0 ? false : true}
                        >
                            {keyModeOptions.map((option) => (
                                <Picker.Item key={option.value} label={option.label} value={option.value} />
                            ))}
                        </Picker>
                        <TextInput
                            style={{ fontSize: 16, height: 50, padding: 10, color: !darkMode ? 'black' : 'white', borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white', marginRight: 5 }}
                            placeholder='Chords'
                            value={section.chords}
                            onChangeText={(text) => updateSection(index, 'chords', text.replace(/#/g, '♯'))}
                        />
                        <View style={{ alignItems: 'center', justifyContent: 'center', height: 50, marginRight: 20 }}>
                            <Button
                                title="Symbols"
                                color="#009788"
                                onPress={() => {
                                    toggleSymbolPickerModal(index);
                                }}
                            />
                        </View>
                    </ScrollView>
                    <TouchableOpacity 
                        onPress={() => removeSection(index)}
                        style={{ position: 'absolute', zIndex: 1, width: 25, height: 25, top: -3, right: -3 }}
                    >
                        <Image 
                            source={!darkMode ? require('../assets/images/remove_icon.png') : require('../assets/images/remove_icon_black.png')}
                            style={{ width: 25, height: 25, position: 'absolute', top: 0, right: 0 }}
                        />
                    </TouchableOpacity>
                </View>
            ))}
            <SymbolPickerModal 
                isVisible={showSymbolPickerModal} 
                onClose={() => toggleSymbolPickerModal(null)} 
                onSelect={handleSymbolSelect}
            />
            <View style={{ padding: 20, marginBottom: 20 }}>
                <Button 
                    title="Edit Song"
                    disabled={!title || !sections.length}
                    onPress={editSong}
                    color='#009788' 
                />
            </View>
        </ScrollView>
    );
}

export default EditSongScreen;