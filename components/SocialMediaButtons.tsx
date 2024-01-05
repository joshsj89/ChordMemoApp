import { Image, View } from 'react-native';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tooltip } from 'react-native-paper';
import SearchDialog from './SearchDialog';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from './ThemeContext';

function SocialMediaButtons({ navigation }) {
    const [searchDialogVisible, setSearchDialogVisible] = useState(false);

    const darkMode = useTheme();

    const handleSearchButtonClick = () => {
        setSearchDialogVisible(true);
    }

    const closeSearchDialog = () => {
        setSearchDialogVisible(false);
    }

    const executeSearch = async (searchText: string, searchOptions: string) => {
        setSearchDialogVisible(false);

        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                const parsedSongs: Song[] = JSON.parse(savedSongs);
                const filteredSongs = parsedSongs.filter(song => {
                    switch (searchOptions) {
                        case 'title':
                            return song.title.toLowerCase().includes(searchText.toLowerCase());
                        case 'artist':
                            return song.artist.toLowerCase().includes(searchText.toLowerCase());
                        case 'genre':
                            return song.genres.some(genre => genre.toLowerCase().includes(searchText.toLowerCase()));
                        case 'key':
                            return song.sections.some(section => {
                                const key = section.key.tonic + section.key.symbol + ' ' + section.key.mode;
                                return key.toLowerCase().includes(searchText.toLowerCase());
                            });
                        case 'chords': // case-sensitive
                            return song.sections.some(section => section.chords.includes(searchText));
                        default: // default to searching by title
                            return song.title.toLowerCase().includes(searchText.toLowerCase());
                    }
                });

                filteredSongs.sort((a, b) => a.title.localeCompare(b.title)); // sort alphabetically by title

                navigation.navigate('SearchResults', { songs: filteredSongs });
            }
        } catch (error) {
            console.error('Error loading songs:', error);
        }
    }

    return (
        <View style={{ flexDirection: 'row' }}>
            <Tooltip title ="Search" leaveTouchDelay={250}>
                <TouchableOpacity onPress={handleSearchButtonClick}>
                    <Image 
                        source={!darkMode ? require('../assets/images/search_icon_white.png') : require('../assets/images/search_icon_black.png')} 
                        style={{ width: 25, height: 25, marginRight: 10 }} 
                    />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="About" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Image 
                        source={!darkMode ? require('../assets/images/Infobox_info_icon.png') : require('../assets/images/Infobox_info_icon_black.png')} 
                        style={{ width: 25, height: 25, marginRight: 10 }} 
                    />
                </TouchableOpacity>
            </Tooltip>
            <SearchDialog 
                isVisible={searchDialogVisible} 
                onClose={closeSearchDialog} 
                onSearch={executeSearch}
            />
        </View>
    );
}

export default SocialMediaButtons;