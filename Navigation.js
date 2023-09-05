import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DrawerContentScrollView, DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import AboutScreen from './screens/AboutScreen';
import SongDetailsScreen from './screens/SongDetailsScreen';
import AddSongScreen from './screens/AddSongScreen';
import ExportImportScreen from './screens/ExportImportScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image, Linking, View, Text } from 'react-native';
import { Tooltip } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createStackNavigator();
const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

let darkMode = false; // will change later (probably to useState)

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

function RightSideDrawerContent({ navigation }) {
    return (
        <View style={{ flex: 1, backgroundColor: '#009788' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white' /* !darkMode ? "white" : "black" */, fontSize: 28 }}>ChordMemo</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ExportImport')}>
                    <Text style={{ color: 'white' /* !darkMode ? "white" : "black" */, fontSize: 20 }}>Export/Import</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => {}}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>Dark Mode: {!darkMode ? 'Off' : 'On'} </Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
//     return (
//         <DrawerContentScrollView>
//             <View style={{ flex: 1, backgroundColor: '#009788' }}>
//                 <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                     <Text style={{ color: 'white', fontSize: 20 }}>ChordMemo</Text>
//                 </View>
//                 <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
//                     <TouchableOpacity onPress={() => navigation.navigate('About')}>
//                         <Text style={{ color: 'white', fontSize: 20 }}>About</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </DrawerContentScrollView>
//     );
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
                            headerTintColor: 'white' /* !darkMode ? "white" : "black" */,
                            headerLeft: () => (
                                <DrawerToggleButton 
                                    tintColor="white" /* {!darkMode ? "white" : "black"} */ 
                                    onPress={() => navigation.toggleDrawer()} 
                                />
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
                    <Stack.Screen
                        name="ExportImport"
                        component={ExportImportScreen}
                        options={{
                            title: 'Export/Import',
                            headerStyle: {
                                backgroundColor: '#009788'
                            },
                            headerTintColor: 'white' /* !darkMode ? "white" : "black" */
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}

function RightDrawerScreen() {
    return (
        <RightDrawer.Navigator 
            initialRouteName="RightDrawer"
            drawerContent={({ navigation }) => <RightSideDrawerContent navigation={navigation} />}
            screenOptions={{ headerShown: false }}
        >
            <RightDrawer.Screen 
                name="RightDrawer" 
                component={HomeScreen}
                options={{
                    drawerPosition: 'right'
                }}
            />
        </RightDrawer.Navigator>
    );
}

function HomeDrawer() {
    return (
        <LeftDrawer.Navigator initialRouteName="HomeDrawer" screenOptions={{ headerShown: false }}>
            <LeftDrawer.Screen 
                name="HomeDrawer" 
                component={RightDrawerScreen} 
                options={{
                    title: 'Home'
                }} 
            />
        </LeftDrawer.Navigator>
    );
}

export default Navigation;