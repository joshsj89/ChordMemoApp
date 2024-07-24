import { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, TextInput, Button } from 'react-native';
import RomanNumeralButton from './RomanNumeralButton';
import ChordTypeButton from './ChordTypeButton';

const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']; // root
const triadTypes: Triad[] = ['M', 'm', '°', '+', 'sus4', 'sus2', '5', 'no5'];
const seventhTypes = {
    // Triads
    'M': [{label: 'M7', value: 'M7'}, {label: '7', value: '7'}, {label: '6', value: '6'}],
    'm': [{label: '7', value: '7'}, {label: 'M7', value: 'mM7'}, {label: '6', value: '6'}],
    '°': [{label: '7♭5', value: 'ø7'}, {label: 'dim7', value: '°7'}],
    '+': [{label: '7♯5', value: '7♯5'}, {label: 'M7♯5', value: 'M7♯5'}],
    'sus4': [{label: '7', value: '7sus4'}],
    'sus2': [{label: '7', value: '7sus2'}],
};
const ninthTypes = {
    // Triads
    'M': [{label: 'add9', value: '(add9)'}],
    'm': [{label: 'add9', value: '(add9)'}],
    '°': [{label: 'add9', value: '°(add9)'}],
    '+': [{label: 'add9', value: '+(add9)'}],
    'sus4': [{label: 'add9', value: 'sus4(add9)'}],
    '5': [{label: 'add9', value: '5(add9)'}],

    // Sevenths
    'M7': [{label: '9', value: 'M9'}, {label: '♭9', value: 'M♭9'}, {label: '♯9', value: 'M♯9'}],
    '7': [{label: '9', value: '9'}, {label: '♭9', value: '♭9'}, {label: '♯9', value: '♯9'}],
    'm7': [{label: '9', value: '9'}, {label: '♭9', value: '♭9'}], //
    'mM7': [{label: '9', value: 'mM9'}, {label: '♭9', value: 'mM♭9'}],
    '6': [{label: '9', value: '6/9'}, {label: '♭9', value: '6/♭9'}, {label: '♯9', value: '6/♯9'}],
    'm6': [{label: '9', value: '6/9'}, {label: '♭9', value: '6/♭9'}], //
}
const eleventhTypes = {
    // Triads
    'M': [{label: 'add11', value: '(add11)'}],
    'm': [{label: 'add11', value: '(add11)'}],
    '°': [{label: 'add11', value: '°(add11)'}],
    '+': [{label: 'add11', value: '+(add11)'}],
    'sus2': [{label: 'add11', value: 'sus2(add11)'}],
    '5': [{label: 'add11', value: '5(add11)'}],

    // Sevenths
    // 'M7': [{label: '11', value: 'M11'}, {label: '♭11', value: 'M♭11'}, {label: '♯11', value: 'M♯11'}],
    // '7': [{label: '11', value: '11'}, {label: '♭11', value: '♭11'}, {label: '♯11', value: '♯11'}],
    // 'm7': [{label: '11', value: 'm11'}, {label: '♭11', value: 'm♭11'}],
    // 'mM7': [{label: '11', value: 'mM11'}, {label: '♭11', value: 'mM♭11'}],
    // '6': [{label: '11', value: '6/11'}, {label: '♭11', value: '6/♭11'}, {label: '♯11', value: '6/♯11'}],
    // 'm6': [{label: '11', value: 'm6/11'}, {label: '♭11', value: 'm6/♭11'}],

    // Ninths
    'M9': [{label: '11', value: 'M11'}, {label: '♯11', value: 'M♯11'}],
    'M♭9': [{label: '11', value: 'M11♭9'}, {label: '♯11', value: 'M♯11♭9'}],
    'M♯9': [{label: '11', value: 'M11♯9'}, {label: '♯11', value: 'M♯11♯9'}],
    '9': [{label: '11', value: '11'}, {label: '♯11', value: '♯11'}],
    '♭9': [{label: '11', value: '11♭9'}, {label: '♯11', value: '♯11♭9'}],
    '♯9': [{label: '11', value: '11♯9'}, {label: '♯11', value: '♯11♯9'}],
    'm9': [{label: '11', value: '11'}, {label: '♭11', value: '♭11'}, {label: '♯11', value: '♯11'}], //
    'm♭9': [{label: '11', value: '11♭9'}, {label: '♭11', value: '♭11♭9'}, {label: '♯11', value: '♯11♭9'}], //
    'mM9': [{label: '11', value: 'mM11'}, {label: '♭11', value: 'mM♭11'}, {label: '♯11', value: 'mM♯11'}],
    'mM♭9': [{label: '11', value: 'mM11♭9'}, {label: '♭11', value: 'mM♭11♭9'}, {label: '♯11', value: 'mM♯11♭9'}],
    '6/9': [{label: '11', value: '6/11'}, {label: '♯11', value: '6/♯11'}],
    '6/♭9': [{label: '11', value: '6/11♭9'}, {label: '♯11', value: '6/♯11♭9'}],
    '6/♯9': [{label: '11', value: '6/11♯9'}, {label: '♯11', value: '6/♯11♯9'}],
    'm6/9': [{label: '11', value: '6/11'}, {label: '♭11', value: '6/♭11'}, {label: '♯11', value: '6/♯11'}], //
    'm6/♭9': [{label: '11', value: '6/11♭9'}, {label: '♭11', value: '6/♭11♭9'}, {label: '♯11', value: '6/♯11♭9'}], //
}
const thirteenthTypes = {
    // Triads
    'M': [{label: 'add13', value: '(add13)'}],
    'm': [{label: 'add13', value: '(add13)'}],
    '°': [{label: 'add13', value: '°(add13)'}],
    '+': [{label: 'add13', value: '+(add13)'}],
    'sus2': [{label: 'add13', value: 'sus2(add13)'}],
    '5': [{label: 'add13', value: '5(add13)'}],

    // Sevenths
    // 'M7': [{label: '13', value: 'M13'}, {label: '♭13', value: 'M♭13'}, {label: '♯13', value: 'M♯13'}],
    // '7': [{label: '13', value: '13'}, {label: '♭13', value: '♭13'}, {label: '♯13', value: '♯13'}],
    // 'm7': [{label: '13', value: 'm13'}, {label: '♭13', value: 'm♭13'}],
    // 'mM7': [{label: '13', value: 'mM13'}, {label: '♭13', value: 'mM♭13'}],
    // '6': [{label: '13', value: '6/13'}, {label: '♭13', value: '6/♭13'}, {label: '♯13', value: '6/♯13'}],
    // 'm6': [{label: '13', value: '6/13'}, {label: '♭13', value: '6/♭13'}],

    // Ninths
    // 'M9': [{label: '13', value: 'M13'}, {label: '♯13', value: 'M♯13'}],
    // 'M♭9': [{label: '13', value: 'M13♭9'}, {label: '♯13', value: 'M♯13♭9'}],
    // 'M♯9': [{label: '13', value: 'M13♯9'}, {label: '♯13', value: 'M♯13♯9'}],
    // '9': [{label: '13', value: '13'}, {label: '♯13', value: '♯13'}],
    // '♭9': [{label: '13', value: '13♭9'}, {label: '♯13', value: '♯13♭9'}],
    // '♯9': [{label: '13', value: '13♯9'}, {label: '♯13', value: '♯13♯9'}],

    // Elevenths
    'M11': [{label: '13', value: 'M13'}, {label: '♭13', value: 'M♭13'}, {label: '♯13', value: 'M♯13'}],
    'M♯11': [{label: '13', value: 'M13♯11'}, {label: '♭13', value: 'M♭13♯11'}, {label: '♯13', value: 'M♯13♯11'}],
    'M11♭9': [{label: '13', value: 'M13♭9'}, {label: '♭13', value: 'M♭13♭9'},{label: '♯13', value: 'M♯13♭9'}],
    'M♯11♭9': [{label: '13', value: 'M13♯11♭9'}, {label: '♭13', value: 'M♭13♯11♭9'},{label: '♯13', value: 'M♯13♯11♭9'}],
    'M11♯9': [{label: '13', value: 'M13♯9'}, {label: '♭13', value: 'M♭13♯9'},{label: '♯13', value: 'M♯13♯9'}],
    'M♯11♯9': [{label: '13', value: 'M13♯11♯9'}, {label: '♭13', value: 'M♭13♯11♯9'},{label: '♯13', value: 'M♯13♯11♯9'}],
    '11': [{label: '13', value: '13'}, {label: '♭13', value: '♭13'}, {label: '♯13', value: '♯13'}],
    '♯11': [{label: '13', value: '13♯11'}, {label: '♭13', value: '♭13♯11'}, {label: '♯13', value: '♯13♯11'}],
    '11♭9': [{label: '13', value: '13♭9'}, {label: '♭13', value: '♭13♭9'}, {label: '♯13', value: '♯13♭9'}],
    '♯11♭9': [{label: '13', value: '13♯11♭9'}, {label: '♭13', value: '♭13♯11♭9'}, {label: '♯13', value: '♯13♯11♭9'}],
    '11♯9': [{label: '13', value: '13♯9'}, {label: '♭13', value: '♭13♯9'}, {label: '♯13', value: '♯13♯9'}],
    '♯11♯9': [{label: '13', value: '13♯11♯9'}, {label: '♭13', value: '♭13♯11♯9'}, {label: '♯13', value: '♯13♯11♯9'}],
    'm11': [{label: '13', value: '13'}, {label: '♭13', value: '♭13'}],
    'm♭11': [{label: '13', value: '13♭11'}, {label: '♭13', value: '♭13♭11'}],
    'm♯11': [{label: '13', value: '13♯11'}, {label: '♭13', value: '♭13♯11'}],
    'm11♭9': [{label: '13', value: '13♭9'}, {label: '♭13', value: '♭13♭9'}],
    'm♭11♭9': [{label: '13', value: '13♭11♭9'}, {label: '♭13', value: '♭13♭11♭9'}],
    'm♯11♭9': [{label: '13', value: '13♯11♭9'}, {label: '♭13', value: '♭13♯11♭9'}],
    'mM11': [{label: '13', value: 'mM13'}, {label: '♭13', value: 'mM♭13'}, {label: '♯13', value: 'mM♯13'}],
    'mM♭11': [{label: '13', value: 'mM13♭11'}, {label: '♭13', value: 'mM♭13♭11'}, {label: '♯13', value: 'mM♯13'}],
    'mM♯11': [{label: '13', value: 'mM13♯11'}, {label: '♭13', value: 'mM♭13♯11'}, {label: '♯13', value: 'mM♯13♯11'}],
    'mM11♭9': [{label: '13', value: 'mM13♭9'}, {label: '♭13', value: 'mM♭13♭9'}, {label: '♯13', value: 'mM♯13♭9'}],
    'mM♭11♭9': [{label: '13', value: 'mM13♭11♭9'}, {label: '♭13', value: 'mM♭13♭11♭9'}, {label: '♯13', value: 'mM♯13♭11♭9'}],
    'mM♯11♭9': [{label: '13', value: 'mM13♯11♭9'}, {label: '♭13', value: 'mM♭13♯11♭9'}, {label: '♯13', value: 'mM♯13♯11♭9'}],
    '6/11': [{label: '♭13', value: '6/♭13'}, {label: '♯13', value: '6/♯13'}],
    '6/♯11': [{label: '♭13', value: '6/♭13♯11'}, {label: '♯13', value: '6/♯13♯11'}],
    '6/11♭9': [{label: '♭13', value: '6/♭13♭9'}, {label: '♯13', value: '6/♯13♭9'}],
    '6/♯11♭9': [{label: '♭13', value: '6/♭13♯11♭9'}, {label: '♯13', value: '6/♯13♯11♭9'}],
    '6/11♯9': [{label: '♭13', value: '6/♭13♯9'}, {label: '♯13', value: '6/♯13♯9'}],
    '6/♯11♯9': [{label: '♭13', value: '6/♭13♯11♯9'}, {label: '♯13', value: '6/♯13♯11♯9'}],
    'm6/11': [{label: '♭13', value: '6/♭13'}, {label: '♯13', value: '6/♯13'}], //
    'm6/♭11': [{label: '♭13', value: '6/♭13♭11'}, {label: '♯13', value: '6/♯13♭11'}], //
    'm6/♯11': [{label: '♭13', value: '6/♭13♯11'}, {label: '♯13', value: '6/♯13♯11'}], //
    'm6/11♭9': [{label: '♭13', value: '6/♭13♭9'}, {label: '♯13', value: '6/♯13♭9'}], //
    'm6/♭11♭9': [{label: '♭13', value: '6/♭13♭11♭9'}, {label: '♯13', value: '6/♯13♭11♭9'}], //
    'm6/♯11♭9': [{label: '♭13', value: '6/♭13♯11♭9'}, {label: '♯13', value: '6/♯13♯11♭9'}], //
}

function ChordKeyboard({ onChordComplete }) {
    const [selectedRomanNumeral, setSelectedRomanNumeral] = useState(null);
    const [selectedTriad, setSelectedTriad] = useState(null);
    const [selectedSeventh, setSelectedSeventh] = useState(null);
    const [selectedNinth, setSelectedNinth] = useState(null);
    const [selectedEleventh, setSelectedEleventh] = useState(null);
    const [selectedThirteenth, setSelectedThirteenth] = useState(null);

    const handleRomanNumeralPress = (numeral) => {
        setSelectedRomanNumeral(numeral);
        setSelectedTriad(null);
        setSelectedSeventh(null);
        setSelectedNinth(null);
        setSelectedEleventh(null);
        setSelectedThirteenth(null);
    };

    const handleTriadPress = (triad) => {
        setSelectedTriad(triad);
        setSelectedSeventh(null);
        setSelectedNinth(null);
        setSelectedEleventh(null);
        setSelectedThirteenth(null);
    }

    const handleSeventhPress = (seventh) => {
        setSelectedSeventh(seventh);
        setSelectedNinth(null);
        setSelectedEleventh(null);
        setSelectedThirteenth(null);
    }

    const handleNinthPress = (ninth) => {
        setSelectedNinth(ninth);
        setSelectedEleventh(null);
        setSelectedThirteenth(null);
    }

    const handleEleventhPress = (eleventh) => {
        setSelectedEleventh(eleventh);
        setSelectedThirteenth(null);
    }

    const handleThirteenthPress = (thirteenth) => {
        setSelectedThirteenth(thirteenth);
    }
    
      const handleChordTypePress = (chordType) => {
            if (selectedRomanNumeral) {
                const completeChord = selectedRomanNumeral + chordType;
                onChordComplete(completeChord);
                setSelectedRomanNumeral(null);
            }
      };

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                <ScrollView>
                    {romanNumerals.map((numeral) => (
                    <RomanNumeralButton
                        key={numeral}
                        numeral={numeral}
                        onPress={handleRomanNumeralPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedRomanNumeral && triadTypes.map((triad) => (
                    <ChordTypeButton
                        key={triad}
                        chordType={triad}
                        onPress={handleTriadPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedTriad && seventhTypes[selectedTriad] && seventhTypes[selectedTriad].map((seventh) => (
                    <ChordTypeButton
                        key={seventh.value}
                        chordType={seventh.label}
                        onPress={handleSeventhPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedSeventh && ninthTypes[selectedSeventh] && ninthTypes[selectedSeventh].map((ninth) => (
                    <ChordTypeButton
                        key={ninth.value}
                        chordType={ninth.label}
                        onPress={handleNinthPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedNinth && eleventhTypes[selectedNinth] && eleventhTypes[selectedNinth].map((eleventh) => (
                    <ChordTypeButton
                        key={eleventh.value}
                        chordType={eleventh.label}
                        onPress={handleEleventhPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedEleventh && thirteenthTypes[selectedEleventh] && thirteenthTypes[selectedEleventh].map((thirteenth) => (
                    <ChordTypeButton
                        key={thirteenth.value}
                        chordType={thirteenth.label}
                        onPress={handleThirteenthPress}
                    />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    column: {
        flexDirection: 'column',
        // flexGrow: 1,
    },
});

export default ChordKeyboard;