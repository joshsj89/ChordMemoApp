import { Text, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../components/ThemeContext";

const keyFeatures = [
    'Chord Progression Storage: Easily create and store chord progressions for songs. Organize them by title, artist, genre, and more.',
    'Interactive Visualization: Visualize your chord progressions on an intuitive interface. See the chords, sections, and keys all at a glance.',
    'Key Information: Add key details like key tonic, key symbol, and key mode to each chord progression for accurate representation.',
    'Genre Categorization: Tag your chord progressions with genres, making it simple to find related progressions for your mood or style.',
    'Section Management: Add, remove, and reorder sections within a chord progression to customize the structure of your song.',
    'Easy Editing: Edit and refine your chord progressions as you go. Rearrange sections, change keys, and update chords seamlessly.',
    'Songwriting Companion: Use ChordMemo to jot down chord progressions for your original songs on the fly. Never lose a brilliant idea again!'
]

function AboutScreen() {
    const darkMode = useTheme();

    return (
        <ScrollView style={!darkMode ? styles.container : stylesDark.container}>
            <Text style={!darkMode ? styles.header : stylesDark.header}>About ChordMemo</Text>
            <Text style={!darkMode ? styles.description : stylesDark.description}>
                Welcome to ChordMemo, your ultimate chord progression companion! ChordMemo is a powerful and user-friendly app designed to help you capture and organize chord progressions for your favorite songs, or even your own original compositions. Whether you're a musician, songwriter, or just someone who loves playing with chord sequences, ChordMemo has got you covered.
            </Text>
            <Text style={!darkMode ? styles.subheader : stylesDark.subheader}>Key Features:</Text>
            {keyFeatures.map((feature, index) => {
                const [boldText, regularText] = feature.split(':');
                return (
                    <Text key={index} style={!darkMode ? styles.feature : stylesDark.feature}>
                        <Text style={styles.boldText}>- {boldText}:</Text>{regularText}
                    </Text>
                );
            })}
            <Text style={!darkMode ? styles.signature : stylesDark.signature}>
                ChordMemo is designed to be your go-to tool for managing and exploring chord progressions. Whether you're practicing, performing, or creating, ChordMemo is here to help you harmonize your musical journey.
                {'\n\n'}Thank you for choosing ChordMemo. I hope you enjoy using the app as much as I enjoyed creating it!
                {'\n\n'}Happy playing!
            </Text>
            <Text style={!darkMode ? styles.signatureName : stylesDark.signatureName}>- Josh Kindarara</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
    },
    subheader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    feature: {
        fontSize: 16,
        marginBottom: 10,
    },
    signature: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 20,
    },
    signatureName: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 30,
        textAlign: 'right',
    },
    boldText: {
        fontWeight: 'bold',
    }
});

const stylesDark = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: 'black'
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: 'white',
    },
    description: {
        fontSize: 16,
        marginBottom: 20,
        color: 'white',
    },
    subheader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: 'white',
    },
    feature: {
        fontSize: 16,
        marginBottom: 10,
        color: 'white',
    },
    signature: {
        fontSize: 16,
        fontStyle: 'italic',
        marginTop: 20,
        color: 'white',
    },
    signatureName: {
        fontSize: 16,
        fontStyle: 'italic',
        marginBottom: 30,
        textAlign: 'right',
        color: 'white',
    },
    boldText: {
        fontWeight: 'bold',
    }
});

export default AboutScreen;