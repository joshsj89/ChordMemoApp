import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RomanNumeralButton = ({ numeral, selected, onPress }: { numeral: RomanNumeral, selected: boolean, onPress: (numeral: RomanNumeral) => void }) => {
    return (
        <TouchableOpacity style={[styles.button, selected && styles.selected]} onPress={() => onPress(numeral)}>
            <Text style={styles.text} numberOfLines={1}>{numeral}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        backgroundColor: '#dcdcdc',
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
        borderColor: '#ffcc00',
        borderWidth: 2,
    }
});

export default RomanNumeralButton;
