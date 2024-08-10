import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';

function SearchResultsScreen({ navigation, route }) {
    const { songs } = route.params;

    const darkMode = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: !darkMode ? "#F2F2F2" : "#171717" }}>
            <FlatList
                data={songs}
                keyExtractor={(item: Song) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SongDetails', { song: item })}
                        style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
                    >
                        <Text style={{ color: !darkMode ? 'black' : '#FAFAFF', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
                        <Text style={{ color: !darkMode ? 'black' : '#99999E' }}>{item.artist}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default SearchResultsScreen;