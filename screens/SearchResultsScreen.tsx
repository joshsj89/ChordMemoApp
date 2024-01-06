import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useTheme } from '../components/ThemeContext';

function SearchResultsScreen({ navigation, route }) {
    const { songs } = route.params;

    const darkMode = useTheme();

    return (
        <View style={{ flex: 1, backgroundColor: !darkMode ? "#F2F2F2" : "black" }}>
            <FlatList
                data={songs}
                keyExtractor={(item: Song) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SongDetails', { song: item })}
                        style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
                    >
                        <Text style={{ color: !darkMode ? 'black' : 'white' }}>{item.title}</Text>
                        <Text style={{ color: !darkMode ? 'black' : 'white' }}>{item.artist}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default SearchResultsScreen;