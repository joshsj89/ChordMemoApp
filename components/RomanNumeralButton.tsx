import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from './ThemeContext';

const RomanNumeralButton = ({ numeral, selected, onPress }: { numeral: RomanNumeral, selected: boolean, onPress: (numeral: RomanNumeral) => void }) => {
    const darkMode = useTheme();

    return (
        <TouchableOpacity style={[styles.button, selected && styles.selected, { backgroundColor: !darkMode ? '#fdfdfd' : '#2d2d2d'}]} onPress={() => onPress(numeral)}>
            <Text style={[styles.text, { color: !darkMode ? '#252525' : '#fafafa'}]} numberOfLines={1}>{numeral}</Text>
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
        minWidth: 50,
    },
    text: {
        fontSize: 18,
        color: '#000',
    },
    selected: { 
        borderColor: '#009788',
        borderWidth: 2,
    }
});

export default RomanNumeralButton;
