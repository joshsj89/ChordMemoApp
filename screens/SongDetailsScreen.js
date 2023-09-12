import { View, Text, Alert, ScrollView } from 'react-native';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../components/ThemeContext';

function SongDetailsScreen({ route }) {
    const { song } = route.params;
    const { navigate } = useNavigation();
    const { goBack } = useNavigation();

    const darkMode = useTheme();

    const deleteSong = async (songId) => {
        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                const updatedSongs = JSON.parse(savedSongs).filter((s) => s.id !== songId);
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
        <View style={{ flex: 1, backgroundColor: !darkMode ? "#F2F2F2" : "black" }}>
            <ScrollView style={{ padding: 20 }}>
                <Text style={{ fontSize: 24, fontWeight: 'bold', color: !darkMode ? 'black' : 'white' }}>{song.title}</Text>
                <Text style={{ fontSize: 16, color: !darkMode ? 'black' : 'white' }}>{song.artist}</Text>
                <Text style={{ fontSize: 16, color: !darkMode ? 'black' : 'white' }}>{song.genres.join(', ')}</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: !darkMode ? 'black' : 'white' }}>Sections:</Text>
                {song.sections.map((section) => (
                    <View key={section.sectionTitle}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: !darkMode ? 'black' : 'white' }}>{section.sectionTitle}</Text>
                        <Text style={{ fontSize: 16, color: !darkMode ? 'black' : 'white' }}>{section.key.tonic}{section.key.symbol} {section.key.mode} - {section.chords}</Text>
                    </View>
                ))}
            </ScrollView>
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

export default SongDetailsScreen;