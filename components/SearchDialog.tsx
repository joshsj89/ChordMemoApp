import { useState, useEffect } from 'react';
import { Modal, Text, View, Button, Platform } from 'react-native';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import { useTheme } from './ThemeContext';
import SymbolPickerModal from './SymbolPickerModal';
import { AutocompleteDropdown, AutocompleteDropdownContextProvider, AutocompleteDropdownItem } from 'react-native-autocomplete-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const radioButtonsData = [
    {
        id: '1',
        label: 'Title',
        value: 'title',
    },
    {
        id: '2',
        label: 'Artist',
        value: 'artist',
    },
    {
        id: '3',
        label: 'Genre',
        value: 'genre',
    },
    {
        id: '4',
        label: 'Key',
        value: 'key',
    },
    {
        id: '5',
        label: 'Chords',
        value: 'chords',
    }
];

const radioButtonsDataDark = [
    {
        id: '1',
        label: 'Title',
        value: 'title',
        color: 'white',
        labelStyle: { color: '#FAFAFF' }
    },
    {
        id: '2',
        label: 'Artist',
        value: 'artist',
        color: 'white',
        labelStyle: { color: '#FAFAFF' }
    },
    {
        id: '3',
        label: 'Genre',
        value: 'genre',
        color: 'white',
        labelStyle: { color: '#FAFAFF' }
    },
    {
        id: '4',
        label: 'Key',
        value: 'key',
        color: 'white',
        labelStyle: { color: '#FAFAFF' }
    },
    {
        id: '5',
        label: 'Chords',
        value: 'chords',
        color: 'white',
        labelStyle: { color: '#FAFAFF' }
    }
];

function SearchDialog({ isVisible, onClose, onSearch }) {
    const [searchText, setSearchText] = useState('');
    const [searchOptions, setSearchOptions] = useState('title');
    const [selectedRadioButton, setSelectedRadioButton] = useState('1');

    const [showSearchDialog, setShowSearchDialog] = useState(true);
    const [showSymbolPickerModal, setShowSymbolPickerModal] = useState(false);

    const [suggestions, setSuggestions] = useState<AutocompleteDropdownItem[]>([]);
    const [songTitles, setSongTitles] = useState<string[]>([]);
    const [songArtists, setSongArtists] = useState<string[]>([]);
    const [songGenres, setSongGenres] = useState<string[]>([]);
    const [songKeys, setSongKeys] = useState<string[]>([]);
    const [songChords, setSongChords] = useState<string[]>([]);

    const darkMode = useTheme();

    const toggleLayer = () => {
        setShowSymbolPickerModal(prev => !prev);
    }

    const handleSymbolSelect = (symbol: string) => {
        setSearchText(prev => prev + symbol);
    }

    const handleSearch = () => {
        onSearch(searchText.trim(), searchOptions);
        setSearchText('');
    }

    const changeSuggestionList = (searchOptionsVal: string) => {
        let newSuggestions: AutocompleteDropdownItem[] = [];

        switch (searchOptionsVal) {
            case 'title':
                newSuggestions = songTitles.map((title, index) => {
                    return {
                        id: index.toString(),
                        title: title
                    };
                });
                break;
            case 'artist':
                newSuggestions = songArtists.map((artist, index) => {
                    return {
                        id: index.toString(),
                        title: artist
                    };
                });
                break;
            case 'genre':
                newSuggestions = songGenres.map((genre, index) => {
                    return {
                        id: index.toString(),
                        title: genre
                    };
                });
                break;
            case 'key':
                newSuggestions = songKeys.map((key, index) => {
                    return {
                        id: index.toString(),
                        title: key
                    };
                });
                break;
            case 'chords':
                newSuggestions = songChords.map((chords, index) => {
                    return {
                        id: index.toString(),
                        title: chords
                    };
                });
                break;
            default:
                break;
        }

        setSuggestions(newSuggestions);
    }

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const savedSongs = await AsyncStorage.getItem('songs');
                if (savedSongs != null) {
                    const parsedSongs: Song[] = JSON.parse(savedSongs);
                    // setSongTitles(parsedSongs.map(song => song.title));
                    // setSongArtists(parsedSongs.map(song => song.artist));
                    // setSongGenres(parsedSongs.flatMap(song => song.genres));
                    // setSongKeys(parsedSongs.flatMap(song => song.sections.map(section => section.key.tonic + section.key.symbol + ' ' + section.key.mode)));
                    // setSongChords(parsedSongs.flatMap(song => song.sections.map(section => section.chords)));

                    const songNames = parsedSongs.map((song, index) => {
                        return {
                            id: index.toString(),
                            title: song.title
                        };
                    });

                    const artists = parsedSongs.map((song, index) => {
                        return {
                            id: index.toString(),
                            title: song.artist
                        };
                    });

                    const genres = parsedSongs.flatMap(song => song.genres).map((genre, index) => {
                        return {
                            id: index.toString(),
                            title: genre
                        };
                    });

                    const keys = parsedSongs.flatMap(song => song.sections.map(section => section.key.tonic + section.key.symbol + ' ' + section.key.mode)).map((key, index) => {
                        return {
                            id: index.toString(),
                            title: key
                        };
                    });

                    const chords = parsedSongs.flatMap(song => song.sections.map(section => section.chords)).map((chords, index) => {
                        return {
                            id: index.toString(),
                            title: chords
                        };
                    });

                    // no duplicates
                    const uniqueSongNames = songNames.filter((song, index, self) => self.findIndex(s => s.title === song.title) === index);
                    const uniqueSongArtists = artists.filter((song, index, self) => self.findIndex(s => s.title === song.title) === index);
                    const uniqueSongGenres = genres.filter((song, index, self) => self.findIndex(s => s.title === song.title) === index);
                    const uniqueSongKeys = keys.filter((song, index, self) => self.findIndex(s => s.title === song.title) === index);
                    const uniqueSongChords = chords.filter((song, index, self) => self.findIndex(s => s.title === song.title) === index);

                    setSongTitles(uniqueSongNames.map(song => song.title));
                    setSongArtists(uniqueSongArtists.map(artist => artist.title));
                    setSongGenres(uniqueSongGenres.map(genre => genre.title));
                    setSongKeys(uniqueSongKeys.map(key => key.title));
                    setSongChords(uniqueSongChords.map(chords => chords.title));
                }
            } catch (error) {
                console.error('Error loading songs:', error);
            }
        }

        loadSongs();
    }, []);

    useEffect(() => {
        changeSuggestionList(searchOptions);
    }, [searchOptions, songTitles]);

    return (
        <Modal visible={isVisible} transparent={true} animationType='slide' onRequestClose={onClose}>
            <AutocompleteDropdownContextProvider>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', gap: 30 }}>
                    {showSearchDialog && (
                        <View style={{ backgroundColor: !darkMode ? 'white' : '#171717', padding: 20, alignItems: 'center', justifyContent: 'center', borderRadius: 10, borderWidth: !darkMode ? 0 : 1, borderColor: !darkMode ? 'white' : '#444', width: '80%' }}>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', color: !darkMode ? 'black' : '#FAFAFF' }}>Search</Text>
                            <View style={{ width: '100%', marginVertical: 10, zIndex: 10 }}>
                                <View>
                                    <AutocompleteDropdown
                                        dataSet={suggestions}
                                        initialValue={searchText}
                                        onChangeText={(text) => setSearchText(text.replace(/#/g, '♯'))}
                                        onSelectItem={(item) => {
                                            if (item?.title) {
                                                setSearchText(item.title);
                                            }
                                        }}
                                        onClear={() => setSearchText('')}
                                        showClear={true}
                                        closeOnBlur={true}
                                        clearOnFocus={false}
                                        direction='down'
                                        caseSensitive={searchOptions === 'chords' ? true : false}
                                        containerStyle={{ borderWidth: 1, borderColor: !darkMode ? 'gray' : 'white', borderRadius: 5 }}
                                        inputContainerStyle={{ backgroundColor: !darkMode ? 'white' : '#171717' }}
                                        textInputProps={{
                                            placeholder: 'Enter search text', 
                                            placeholderTextColor: 'gray', 
                                            // value: searchText, 
                                            style: { color: !darkMode ? 'black' : 'white' } // text color
                                        }}
                                        suggestionsListContainerStyle={{ borderWidth: 1, borderColor: !darkMode ? '#ccc' : 'white', backgroundColor: !darkMode ? 'white' : '#171717' }}
                                        suggestionsListTextStyle={{ color: !darkMode ? 'black' : 'white' }} // suggestion text color
                                        EmptyResultComponent={(
                                            <View style={{ padding: 15, flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'nowrap', width: '100%' }}>
                                                <Text style={{ fontSize: 16, flexGrow: 1, flexShrink: 0, color: !darkMode ? 'black' : 'white' }}>{searchText}</Text>
                                            </View>
                                        )}
                                    />
                                </View>
                            </View>
                            {Platform.OS === 'android' && (
                                <Button
                                    title="Insert Symbol"
                                    color="#009788"
                                    onPress={toggleLayer}
                                />
                            )}
                            {Platform.OS === 'ios' && (
                                <View style={{ backgroundColor: '#009788' }}>
                                    <Button
                                        title="Insert Symbol"
                                        color="white"
                                        onPress={toggleLayer}
                                    />
                                </View>
                            )}
                            <RadioButtonsGroup
                                layout='row'
                                containerStyle={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }} 
                                radioButtons={!darkMode ? radioButtonsData : radioButtonsDataDark}
                                onPress={(selectedId) => {
                                    setSelectedRadioButton(selectedId);

                                    const selRadioButton = radioButtonsData.find(radioButton => radioButton.id === selectedId);
                                    if (selRadioButton) {
                                        setSearchOptions(selRadioButton.value);
                                    }
                                }}
                                selectedId={selectedRadioButton}
                            />
                            <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                                {Platform.OS === 'android' && (
                                    <>
                                        <Button title="Close" onPress={onClose} color="#009788" />
                                        <Button title="Search" onPress={handleSearch} color="#009788" />
                                    </>
                                )}
                                {Platform.OS === 'ios' && (
                                    <>
                                        <View style={{ backgroundColor: '#009788' }}>
                                            <Button title="Close" onPress={onClose} color="white" />
                                        </View>
                                        <View style={{ backgroundColor: '#009788' }}>
                                            <Button title="Search" onPress={handleSearch} color="white" />
                                        </View>
                                    </>
                                )}
                            </View>
                        </View>
                    )}
                    {showSymbolPickerModal && (
                        <SymbolPickerModal 
                            isVisible={showSymbolPickerModal} 
                            onClose={toggleLayer} 
                            onSelect={handleSymbolSelect} 
                        />
                    )}
                </View>
            </AutocompleteDropdownContextProvider>
        </Modal>
    )
}

export default SearchDialog;