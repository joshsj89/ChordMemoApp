import { View, Text, FlatList, TouchableOpacity } from 'react-native';

function SearchResultsScreen({ navigation, route }) {
    const { songs } = route.params;

    return (
        <View style={{ flex: 1, /*backgroundColor: !darkMode ? "#F2F2F2" : "black"*/ }}>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SongDetails', { song: item })}
                        style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
                    >
                        <Text>{item.title}</Text>
                        <Text>{item.artist}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

export default SearchResultsScreen;