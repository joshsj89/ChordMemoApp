import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const ChordTypeButton = ({ chordType, selected, onPress }: { chordType: ChordType, selected: boolean, onPress: (chordType: ChordType) => void }) => {
    const darkMode = useTheme();

    return (
        <TouchableOpacity style={[styles.button, selected && styles.selected, { backgroundColor: !darkMode ? '#fdfdfd' : '#2d2d2d'}]} onPress={() => onPress(chordType)}>
            <Text style={[styles.text, { color: !darkMode ? '#252525' : '#fafafa'}]} numberOfLines={1}>{chordType.label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        // flex: 1,
        // minWidth: 60,
        // maxWidth: 60,
        // height: 60,
    },

    text: {
        fontSize: 12,
    },
    selected: { 
        borderColor: '#009788',
        borderWidth: 2,
    }
});

export default ChordTypeButton;