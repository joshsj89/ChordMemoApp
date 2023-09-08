import { Image, Linking, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tooltip } from 'react-native-paper';
import { Provider as PaperProvider } from 'react-native-paper';

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

export default RightSideDrawerContent;