import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import SongDetailsScreen from './screens/SongDetailsScreen';
import AddSongScreen from './screens/AddSongScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Linking, View } from 'react-native';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function SocialMediaButtons() {
    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => Linking.openURL('https://www.github.com/joshsj89')}>
                <Image source={require('./assets/images/github-mark-white.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('https://joshsj89.github.io')}>
                <Image source={require('./assets/images/website_logo.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL('mailto:joshsj89@gmail.com')}>
                <Image source={require('./assets/images/email.png')} style={{ width: 25, height: 18, marginRight: 10, marginTop: 4 }} />
            </TouchableOpacity>
        </View>
    );
}

function Navigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Home'>
                <Stack.Screen 
                    name="Home" 
                    component={HomeDrawer} 
                    options={({ navigation }) => ({
                        title: 'ChordMemo',
                        headerStyle: {
                            backgroundColor: '#009788',
                        },
                        headerTintColor: '#fff',
                        headerLeft: () => (
                            <DrawerToggleButton tintColor="white" onPress={() => navigation.toggleDrawer()} />
                        ),
                        headerRight: () => <SocialMediaButtons />
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

function HomeDrawer() {
    return (
            <Drawer.Navigator initialRouteName="HomeDrawer" screenOptions={{ headerShown: false }}>
                <Drawer.Screen 
                    name="HomeDrawer" 
                    component={HomeScreen} 
                    options={{
                        title: 'Home',
                        headerStyle: {
                            backgroundColor: '#009788',
                        },
                        headerTintColor: '#fff'
                    }} 
                />
            </Drawer.Navigator>
    );
}

export default Navigation;