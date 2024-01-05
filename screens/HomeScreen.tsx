import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';
import { HomeScreenNavigationProp } from '../types/screens';

function HomeScreen({ navigation }) {
    const [songs, setSongs] = useState([]);
    const { navigate } = useNavigation<HomeScreenNavigationProp>();

    const darkMode = useTheme();

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const savedSongs = await AsyncStorage.getItem('songs');
                if (savedSongs != null) {
                    setSongs(JSON.parse(savedSongs));
                }
            } catch (error) {
                console.error('Error loading songs:', error);
            }
        }

        const unsubscribe = navigation.addListener('focus', loadSongs); // This is the key to refreshing the list when navigating back to the HomeScreen

        return () => unsubscribe();
        
    }, [navigation]);

    return (
        <View style={{ flex: 1, backgroundColor: !darkMode ? "#F2F2F2" : "black" }}>
            <FlatList
                data={songs}
                keyExtractor={(item: any) => item.id} // 'any for now
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
            <FAB 
                style={{ position: 'absolute', right: 5, bottom: 10, backgroundColor: '#009788' }}
                color={!darkMode ? "white" : "black"}
                icon="plus"
                onPress={() => navigate('AddSong')}
            />
        </View>
    );
}

export default HomeScreen;