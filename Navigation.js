import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import SongDetailsScreen from './screens/SongDetailsScreen';
import AddSongScreen from './screens/AddSongScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={({ navigation }) => ({
                        title: 'ChordMemo',
                        headerStyle: {
                            backgroundColor: '#009788',
                        },
                        headerTintColor: '#fff',
                        headerLeft: () => (
                            <DrawerToggleButton tintColor="white" onPress={() => navigation.toggleDrawer()} />
                        )
                    })} 
                />
                <Stack.Screen 
                    name="SongDetails" 
                    component={SongDetailsScreen} 
                    options={({ route }) => ({ 
                        title: route.params.song.title,
                        headerStyle: {
                            backgroundColor: '#009788',
                        },
                        headerTintColor: '#fff'
                    })} 
                />
                <Stack.Screen 
                    name="AddSong" 
                    component={AddSongScreen} 
                    options={{ 
                        title: 'Add Song',
                        headerStyle: {
                            backgroundColor: '#009788',
                        },
                        headerTintColor: '#fff' 
                    }} 
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;