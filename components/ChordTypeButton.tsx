import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ChordTypeButton = ({ chordType, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={() => onPress(chordType)}>
            <Text style={styles.text} numberOfLines={1}>{chordType}</Text>
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
        // flex: 1,
        // minWidth: 60,
        // maxWidth: 60,
        // height: 60,
    },

    text: {
        fontSize: 12,
        color: '#000',
    },
});

export default ChordTypeButton;