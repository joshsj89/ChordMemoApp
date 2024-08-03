import { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, TouchableOpacity, StyleSheet, BackHandler } from 'react-native';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext';
import { HomeScreenNavigationProp } from '../types/screens';

function SongDetailsScreen({ route }) {
    const { song }: { song: Song } = route.params;
    const { navigate } = useNavigation<HomeScreenNavigationProp>();
    const { goBack } = useNavigation();
    const darkMode = useTheme();

    const [showSections, setShowSections] = useState(false);

    const toggleSections = () => {
        setShowSections(showSections => !showSections);
    }

    useEffect(() => {
        const backAction = () => { // close chord keyboard on back button press
            if (showSections) {
                setShowSections(false);
                return true; // prevent default back action
            } else {
                return false; // allow default back action
            }
        }

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove(); // cleanup back handler on component unmount
    }, [showSections]);

    const deleteSong = async (songId: string) => {
        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                const updatedSongs: Song[] = JSON.parse(savedSongs).filter((s: Song) => s.id !== songId);
                await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
                goBack();
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    }

    const confirmDelete = () => {
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
        <View style={[styles.screen, { backgroundColor: !darkMode ? "#F2F2F2" : "black" }]}>
            <View style={styles.upperContainer}>
                {showSections && <>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: !darkMode ? 'black' : 'white', textAlign: 'center' }}>{song.title}</Text>
                    {song.artist.length > 0 && <Text style={{ fontSize: 15, color: !darkMode ? 'black' : 'white', textAlign: 'center' }}>{song.artist}</Text>}
                </>}
            </View>
            <View style={styles.container}>
                {!showSections && <TouchableOpacity style={[styles.songNameContainer, { borderColor: !darkMode ? 'black' : '#2a2a2a' }]} onPress={toggleSections}>
                    <Text style={{ fontSize: 50, fontWeight: 'bold', color: !darkMode ? 'black' : 'white', textAlign: 'center' }}>{song.title}</Text>
                </TouchableOpacity>}
                {!showSections && <View style={styles.artistContainer}>
                    {song.artist.length > 0 && <Text style={{ fontSize: 20, color: !darkMode ? 'black' : 'white', textAlign: 'center' }}>{song.artist}</Text>}
                    {song.genres.length > 0 && <Text style={{ fontSize: 16, color: '#89a1aa', textAlign: 'center' }}>{song.genres.join(', ')}</Text>}

                </View>}
                {showSections && <ScrollView style={styles.sectionsContainer}>
                    {song.sections.map((section, index) => (
                        <View key={index}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: !darkMode ? 'black' : 'white' }}>{section.sectionTitle}</Text>
                            <Text style={{ fontSize: 16, color: !darkMode ? 'black' : 'white' }}>{section.key.tonic}{section.key.symbol} {section.key.mode} - {section.chords}</Text>
                        </View>
                    ))}
                </ScrollView>}
            </View>
            <View style={{ position: 'absolute', right: 5, bottom: 10, flexDirection: 'row', gap: 10 }}>
                <FAB
                    style={{ backgroundColor: '#009788' }}
                    color={!darkMode ? "white" : "black"}
                    icon="pencil"
                    onPress={() => navigate('EditSong', { song })}
                />
                <FAB
                    style={{ backgroundColor: '#009788' }}
                    color={!darkMode ? "white" : "black"}
                    icon="delete"
                    onPress={confirmDelete}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1, 
        paddingTop: 10, 
        paddingBottom: 100, 
        paddingHorizontal: 25,
    },
    upperContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 10,
        minHeight: 56,
    },
    container: {
        margin: 10,
        borderRadius: 10,
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    sectionsContainer: { 
        padding: 10, 
        width: '100%',
    },
    songNameContainer: {
        padding: 20,
        borderRadius: 30,
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    artistContainer: {
        borderRadius: 10,
        marginTop: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default SongDetailsScreen;