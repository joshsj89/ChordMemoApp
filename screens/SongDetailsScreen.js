import { View, Text, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

function SongDetailsScreen({ route }) {
    const { song } = route.params;
    const { goBack } = useNavigation();

    const deleteSong = async (songId) => {
        try {
            const savedSongs = await AsyncStorage.getItem('songs');
            if (savedSongs != null) {
                const updatedSongs = JSON.parse(savedSongs).filter((s) => s.id !== songId);
                await AsyncStorage.setItem('songs', JSON.stringify(updatedSongs));
                console.log('Song deleted successfully');
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
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{song.title}</Text>
            <Text style={{ fontSize: 16 }}>{song.artist}</Text>
            <Text style={{ fontSize: 16 }}>{song.genres.join(', ')}</Text>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Sections:</Text>
            {song.sections.map((section) => (
                <View key={section.sectionTitle}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{section.sectionTitle}</Text>
                    <Text style={{ fontSize: 16 }}>{section.key.tonic}{section.key.symbol} {section.key.mode} - {section.chords}</Text>
                </View>
            ))}
            <View style={{ position: 'absolute', right: 0, top: 550, flexDirection: 'row' }}>
                <FAB
                    style={{ marginRight: 10, backgroundColor: '#009788' }}
                    color="white"
                    icon='pencil'
                    onPress={() => console.log('Edit Pressed')}
                />
                <FAB
                    style={{ backgroundColor: '#009788' }}
                    color="white"
                    icon='delete'
                    onPress={confirmDelete}
                />
            </View>

        </View>
    );
}

export default SongDetailsScreen;