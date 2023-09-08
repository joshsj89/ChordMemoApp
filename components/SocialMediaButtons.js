import { Image, Linking, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Tooltip } from 'react-native-paper';
import SearchDialog from './SearchDialog';

function SocialMediaButtons({ navigation }) {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Tooltip title ="Search" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => {}}>
                    <Image 
                        source={/*!darkMode ? */ require('../assets/images/search_icon_white.png') /*: require('../assets/images/search_icon_black.png')*/ } 
                        style={{ width: 25, height: 25, marginRight: 10 }} 
                    />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="GitHub" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.github.com/joshsj89')}>
                    <Image source={require('../assets/images/github-mark-white.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="My Website" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => Linking.openURL('https://joshsj89.github.io')}>
                    <Image source={require('../assets/images/website_logo.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="Email" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => Linking.openURL('mailto:joshsj89@gmail.com')}>
                    <Image source={require('../assets/images/email.png')} style={{ width: 25, height: 18, marginRight: 10, marginTop: 4 }} />
                </TouchableOpacity>
            </Tooltip>
            <Tooltip title ="About" leaveTouchDelay={250}>
                <TouchableOpacity onPress={() => navigation.navigate('About')}>
                    <Image source={require('../assets/images/Infobox_info_icon.png')} style={{ width: 25, height: 25, marginRight: 10 }} />
                </TouchableOpacity>
            </Tooltip>
        </View>
    );
}

export default SocialMediaButtons;