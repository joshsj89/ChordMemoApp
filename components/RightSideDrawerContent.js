import { Linking, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { DONATE_LINK } from '@env';
import { useTheme, useThemeUpdate } from './ThemeContext';

function RightSideDrawerContent({ navigation }) {
    const darkMode = useTheme();
    const toggleDarkMode = useThemeUpdate();

    return (
        <View style={{ flex: 1, backgroundColor: '#009788' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: !darkMode ? "white" : "black", fontSize: 28 }}>ChordMemo</Text>
            </View>
            <View style={{ flex: 1, alignItems: 'center', gap: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate('ExportImport')}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>Export/Import Songs</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={toggleDarkMode}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>Dark Mode: {!darkMode ? 'Off' : 'On'} </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://joshsj89.github.io/ChordMemo')}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>My Website</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.github.com/joshsj89')}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>GitHub</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://joshsj89.github.io/#contact')}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>Contact Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:joshsj89@gmail.com')}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>Email Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL(DONATE_LINK)}>
                    <Text style={{ color: !darkMode ? "white" : "black", fontSize: 20 }}>Donate</Text>
                </TouchableOpacity>
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

export default RightSideDrawerContent;