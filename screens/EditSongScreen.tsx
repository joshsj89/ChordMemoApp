import { useEffect, useState } from 'react';
import { View, ScrollView, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { sectionTypeOptions, keyTonicOptions, keySymbolOptions, keyModeOptions, genreOptions } from '../options';
import { CheckBox } from 'react-native-btr';
import { useTheme } from '../components/ThemeContext';
import SymbolPickerModal from '../components/SymbolPickerModal';
import { EditSongScreenNavigationProp } from '../types/screens';
import { AutocompleteDropdown, TAutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';

function EditSongScreen({ route }) {
    const { song }: { song: Song } = route.params;
    const [title, setTitle] = useState<string>(song.title);
    const [artist, setArtist] = useState<string>(song.artist);
    const [genres, setGenres] = useState<string[]>(song.genres);
    const [sections, setSections] = useState<Section[]>(song.sections);
    const [sectionTitle, setSectionTitle] = useState<string>('Verse');
    const [keyTonic, setKeyTonic] = useState<string>('C');
    const [keySymbol, setKeySymbol] = useState<string>('');
    const [keyMode, setKeyMode] = useState<string>('Major');
    const [chords, setChords] = useState<string>('');
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [availableGenres, setAvailableGenres] = useState<GenreOption[]>(genreOptions);
    const [showSymbolPickerModal, setShowSymbolPickerModal] = useState<boolean>(false);
    const [symbolPickerModalSectionIndex, setSymbolPickerModalSectionIndex] = useState<number | null>(null);
    const [artistSuggestions, setArtistSuggestions] = useState<TAutocompleteDropdownItem[]>([]);
    const [songArtists, setSongArtists] = useState<string[]>([]);

    const darkMode = useTheme();

    const { navigate } = useNavigation<EditSongScreenNavigationProp>();

    useEffect(() => {
        const usedGenres = genres.map((genre) => genre);
        const updatedAvailableGenres = genreOptions.filter((genre) => !usedGenres.includes(genre.value));
        setAvailableGenres(updatedAvailableGenres);
    }, [genres]);

    useEffect(() => { // load artists from saved songs
        const loadArtists = async () => {
            try {
                const savedSongs = await AsyncStorage.getItem('songs');

                if (savedSongs != null) {
                    const parsedSongs: Song[] = JSON.parse(savedSongs);
                    const artists = parsedSongs.map((song, index) => {
                        return {
                            id: index.toString(),
                            title: song.artist
                        };
                    });

                    // no duplicates
                    const uniqueArtists = [...new Map(artists.map(item => [item.title, item])).values()];

                    setSongArtists(uniqueArtists.map((artist) => artist.title));
                }
            } catch (error) {
                console.error('Error loading artists:', error);
            }
        }

        loadArtists();
    }, []);

    const handleArtistInputChange = (text: string) => {
        setArtist(text);
        
        const updatedArtistSuggestions = songArtists.filter((songArtist) => songArtist.toLowerCase().includes(text.toLowerCase())).map((songArtist, index) => {
            return {
                id: index.toString(),
                title: songArtist
            }
        });

        setArtistSuggestions(updatedArtistSuggestions);
    }

    useEffect(() => { // set initial value of dropdown to the current song's artist
        setArtistSuggestions([{
            id: artist,
            title: artist
        }]);
    }, []);

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
        const newSection: Section = { sectionTitle, key: { tonic: keyTonic, symbol: keySymbol, mode: keyMode }, chords };
        setSections([...sections, newSection]);
    }

    const updateSection = (index: number, key: string, value: string) => {
        const updatedSections = [...sections];
        updatedSections[index][key] = value;
        setSections(updatedSections);
    }

    const updateSectionKey = (index: number, key: string, value: string) => {
        const updatedSections = [...sections];
        updatedSections[index].key[key] = value;
        setSections(updatedSections);
    }

    const removeSection = (index: number) => {
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
            };

            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                const updatedSongs: Song[] = JSON.parse(savedSongs).map((s: Song) => {
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
            <View style={{ marginVertical: 10 }}>
                <AutocompleteDropdown 
                    dataSet={artistSuggestions}
                    initialValue={artist}
                    onChangeText={handleArtistInputChange}
                    onSelectItem={(item) => {
                        if (item?.title) {
                            setArtist(item.title);
                        }
                    }}
                    closeOnBlur={true}
                    clearOnFocus={false}
                    inputContainerStyle={{ backgroundColor: !darkMode ? 'white' : 'black' }}
                    textInputProps={{ placeholder: 'Artist', placeholderTextColor: 'gray', style: { color: !darkMode ? 'black' : 'white' } }}
                    containerStyle={{ borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white' }}
                    suggestionsListContainerStyle={{ borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white', backgroundColor: !darkMode ? 'white' : 'black' }}
                    suggestionsListTextStyle={{ color: !darkMode ? 'black' : 'white' }}
                    EmptyResultComponent={(
                        <View style={{ padding: 15, flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'nowrap', width: '100%' }}>
                            <Text style={{ fontSize: 16, flexGrow: 1, flexShrink: 0, color: !darkMode ? 'black' : 'white' }}>{artist}</Text>
                        </View>
                    )}
                />
            </View>
            <Button title='Add Genre'onPress={addGenre} color='#009788' />
            {genres.length !== 0 && (
                <ScrollView horizontal style={{ flexDirection: 'row', marginVertical: 10, padding: 5, borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white' }}>
                    {genres.map((genre, index) => (
                        <View key={index} style={{ borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white', marginHorizontal: 10, marginVertical: 10 }}>
                            <Picker
                                selectedValue={genre}
                                style={{ height: 50, width: 120, zIndex: 0, color: !darkMode ? 'black' : 'white' }}
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
                        onPress={() => {
                            if (!isChecked) { // changes all section keys based on 1st section key
                                sections.forEach((section, index) => {
                                    updateSectionKey(index, 'tonic', sections[0].key.tonic);
                                    updateSectionKey(index, 'symbol', sections[0].key.symbol);
                                    updateSectionKey(index, 'mode', sections[0].key.mode);
                                });
                            }

                            setIsChecked(!isChecked);
                        }}
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
                                if (isChecked) {
                                    if (index === 0) {
                                        updateSectionKey(index, 'tonic', itemValue);
                                        sections.forEach((section, i) => { // change the other sections while check box is checked
                                            if (i !== 0) { // allows one to change the first section key while check box is checked
                                                updateSectionKey(i, 'tonic', sections[0].key.tonic);
                                            }
                                        })
                                    } else {
                                        updateSectionKey(index, 'tonic', sections[0].key.tonic);
                                        setKeyTonic(sections[0].key.tonic);
                                    }
                                } else {
                                    updateSectionKey(index, 'tonic', itemValue);
                                    setKeyTonic(itemValue); // defaults new Picker to the last edited section's keyTonic
                                }
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
                                if (isChecked) {
                                    if (index === 0) {
                                        updateSectionKey(index, 'symbol', itemValue);
                                        sections.forEach((section, i) => { // change the other sections while check box is checked
                                            if (i !== 0) { // allows one to change the first section key while check box is checked
                                                updateSectionKey(i, 'symbol', sections[0].key.symbol);
                                            }
                                        })
                                    } else {
                                        updateSectionKey(index, 'symbol', sections[0].key.symbol);
                                        setKeySymbol(sections[0].key.symbol);
                                    }
                                } else {
                                    updateSectionKey(index, 'symbol', itemValue);
                                    setKeySymbol(itemValue); // defaults new Picker to the last edited section's keySymbol
                                }
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
                                if (isChecked) {
                                    if (index === 0) {
                                        updateSectionKey(index, 'mode', itemValue);
                                        sections.forEach((section, i) => { // change the other sections while check box is checked
                                            if (i !== 0) { // allows one to change the first section key while check box is checked
                                                updateSectionKey(i, 'mode', sections[0].key.mode);
                                            }
                                        })
                                    } else {
                                        updateSectionKey(index, 'mode', sections[0].key.mode);
                                        setKeyMode(sections[0].key.mode);
                                    }
                                } else {
                                    updateSectionKey(index, 'mode', itemValue);
                                    setKeyMode(itemValue); // defaults new Picker to the last edited section's keyMode
                                }
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
                            placeholderTextColor='gray'
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