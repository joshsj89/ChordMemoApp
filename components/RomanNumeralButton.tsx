import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const RomanNumeralButton = ({ numeral, onPress }: { numeral: RomanNumeral, onPress: (numeral: RomanNumeral) => void }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress(numeral)}>
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
});

export default RomanNumeralButton;
