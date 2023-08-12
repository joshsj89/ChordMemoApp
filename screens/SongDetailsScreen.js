import { View, Text } from 'react-native';

function SongDetailsScreen({ route }) {
    const { song } = route.params;

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{song.title}</Text>
            <Text style={{ fontSize: 16 }}>{song.artist}</Text>
            <Text style={{ fontSize: 16 }}>{song.genres.join(', ')}</Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Sections:</Text>
            {song.sections.map((section) => (
                <View key={section.sectionTitle}>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{section.sectionTitle}</Text>
                    <Text style={{ fontSize: 16 }}>{section.key}</Text>
                    <Text style={{ fontSize: 16 }}>{section.chords.join(', ')}</Text>
                </View>
            ))}
        </View>
    );
}

export default SongDetailsScreen;