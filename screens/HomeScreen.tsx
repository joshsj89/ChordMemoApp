import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, BackHandler, ToastAndroid } from 'react-native';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../components/ThemeContext';
import { HomeScreenNavigationProp } from '../types/screens';

function HomeScreen({ navigation }) {
    const [songs, setSongs] = useState<Song[]>([]);
    const { navigate } = useNavigation<HomeScreenNavigationProp>();

    const [backPressedOnce, setBackPressedOnce] = useState(false);

    const darkMode = useTheme();

    useEffect(() => {
        const loadSongs = async () => {
            try {
                const savedSongs = await AsyncStorage.getItem('songs');
                if (savedSongs != null) {
                    const parsedSongs: Song[] = JSON.parse(savedSongs);
                    setSongs(parsedSongs);
                }
            } catch (error) {
                console.error('Error loading songs:', error);
            }
        }

        const handleBackPress = () => {
            if (backPressedOnce) { // If the back button has been pressed once already, exit the app
                BackHandler.exitApp();
            } else {
                setBackPressedOnce(true);
                ToastAndroid.show('Press back again to exit', ToastAndroid.SHORT);

                setTimeout(() => setBackPressedOnce(false), 4000); // Reset the backPressedOnce state after 2 seconds

                return true; // Prevent default back button behavior
            }
        }

        const unsubscribe = navigation.addListener('focus', loadSongs); // This is the key to refreshing the list when navigating back to the HomeScreen
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);

        return () => {
            unsubscribe();
            backHandler.remove();
        };
        
    }, [navigation, backPressedOnce]);

    return (
        <View style={{ flex: 1, backgroundColor: !darkMode ? "#F2F2F2" : "black" }}>
            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SongDetails', { song: item })}
                        style={{ padding: 10, borderBottomWidth: 1, borderColor: 'gray' }}
                    >
                        <Text style={{ color: !darkMode ? 'black' : 'white', fontWeight: 'bold', fontSize: 16 }}>{item.title}</Text>
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