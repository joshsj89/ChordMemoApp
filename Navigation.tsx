import { useState } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { DrawerToggleButton, createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import SearchResultsScreen from './screens/SearchResultsScreen';
import AboutScreen from './screens/AboutScreen';
import SongDetailsScreen from './screens/SongDetailsScreen';
import AddSongScreen from './screens/AddSongScreen';
import EditSongScreen from './screens/EditSongScreen';
import ExportImportScreen from './screens/ExportImportScreen';
import SocialMediaButtons from './components/SocialMediaButtons';
import RightSideDrawerContent from './components/RightSideDrawerContent';
import { useTheme } from './components/ThemeContext';
import { RootStackParamList } from './types/screens';

const Stack = createStackNavigator<RootStackParamList>();
const LeftDrawer = createDrawerNavigator();
const RightDrawer = createDrawerNavigator();

function Navigation() {
    const darkMode = useTheme();

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
                            headerTintColor: !darkMode ? "white" : "black",
                            headerLeft: () => (
                                <DrawerToggleButton 
                                    tintColor={!darkMode ? "white" : "black"} 
                                    // onPress={() => navigation.toggleDrawer()}
                                />
                            ),
                            headerRight: () => <SocialMediaButtons navigation={navigation} />
                        })} 
                    />
                    <Stack.Screen
                        name="SearchResults"
                        component={SearchResultsScreen}
                        options={{
                            title: 'Search Results',
                            headerStyle: {
                                backgroundColor: '#009788'
                            },
                            headerTintColor: !darkMode ? "white" : "black",
                        }}
                    />
                    <Stack.Screen
                        name="About"
                        component={AboutScreen}
                        options={{
                            title: 'About',
                            headerStyle: {
                                backgroundColor: '#009788'
                            },
                            headerTintColor: !darkMode ? "white" : "black"
                        }}
                    />
                    <Stack.Screen 
                        name="SongDetails" 
                        component={SongDetailsScreen} 
                        options={({ route }) => ({ 
                            title: route.params?.song.title,
                            headerStyle: {
                                backgroundColor: '#009788'
                            },
                            headerTintColor: !darkMode ? "white" : "black"
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
                            headerTintColor: !darkMode ? "white" : "black" 
                        }} 
                    />
                    <Stack.Screen 
                        name="EditSong"
                        component={EditSongScreen}
                        options={{
                            title: 'Edit Song',
                            headerStyle: {
                                backgroundColor: '#009788'
                            },
                            headerTintColor: !darkMode ? "white" : "black"
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
                            headerTintColor: !darkMode ? "white" : "black"
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
    const darkMode = useTheme();

    return (
        <LeftDrawer.Navigator initialRouteName="HomeDrawer" screenOptions={{ headerShown: false }}>
            <LeftDrawer.Screen 
                name="HomeDrawer" 
                component={RightDrawerScreen} 
                options={{
                    title: 'Home',
                    drawerStyle: {backgroundColor: !darkMode ? 'white' : 'black' },
                    drawerActiveTintColor: !darkMode ? '#0077FF' : '#009788',
                }}
            />
        </LeftDrawer.Navigator>
    );
}

export default Navigation;