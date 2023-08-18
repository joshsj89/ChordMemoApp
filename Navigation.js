import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SongDetailsScreen from './screens/SongDetailsScreen';
import AddSongScreen from './screens/AddSongScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Linking, View, Text } from 'react-native';
import { Tooltip } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function SocialMediaButtons({ navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Tooltip title ="GitHub" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.github.com/joshsj89')}>
                    <Image source={require('./assets/images/github-mark-white.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="My Website" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => Linking.openURL('https://joshsj89.github.io')}>
                    <Image source={require('./assets/images/website_logo.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="Email" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:joshsj89@gmail.com')}>
                    <Image source={require('./assets/images/email.png')} style={{ width: 25, height: 18, marginRight: 10, marginTop: 4 }} />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="About" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Image source={require('./assets/images/Infobox_info_icon.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                </TouchableOpacity>
            </Tooltip>
        </View>
    );
}

function Navigation() {
    return (
        <PaperProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName='Home'>
                    <Stack.Screen 
                        name="Home" 
                        component={HomeDrawer} 
                        options={({ navigation }) => ({
                            title: 'ChordMemo',
                            headerStyle: {
                                backgroundColor: '#009788'
                            },
                            headerTintColor: '#fff',
                            headerLeft: () => (
                                <DrawerToggleButton tintColor="white" onPress={() => navigation.toggleDrawer()} />
                                ),
                            headerRight: () => <SocialMediaButtons navigation={navigation} />
                        })} 
                    />
                    <Stack.Screen
                        name="About"
                        component={AboutScreen}
                        options={{
                            title: 'About',
                            headerStyle: {
                                backgroundColor: '#009788'
                            },
                            headerTintColor: '#fff',
                            // headerRight: () => <SocialMediaButtons />
                        }}
                    />
                    <Stack.Screen 
                        name="SongDetails" 
                        component={SongDetailsScreen} 
                        options={({ route }) => ({ 
                            title: route.params.song.title,
                            headerStyle: {
                                backgroundColor: '#009788'
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
                                backgroundColor: '#009788'
                            },
                            headerTintColor: '#fff' 
                        }} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
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