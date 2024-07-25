import { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { useTheme } from './ThemeContext';
import RomanNumeralButton from './RomanNumeralButton';
import ChordTypeButton from './ChordTypeButton';

const romanNumerals: RomanNumeral[] = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII']; // root
const triadTypes: ChordType[] = [
    { label: 'M', alt: 'M', value: '' }, 
    { label: 'm', alt: 'm', value: '' }, 
    { label: '°', alt: '°', value: '°' }, 
    { label: '+', alt: '+', value: '+' }, 
    { label: 'sus4', alt: 'sus4', value: 'sus4' }, 
    { label: 'sus2', alt: 'sus2', value: 'sus2' }, 
    { label: '5', alt: '5', value: '5' }, 
    { label: 'no5', alt: 'no5', value: 'no5' }
];
const seventhTypes: ExtendedChordTypes = {
    // Triads
    'M': [{label: 'M7', alt: 'M7', value: 'M7'}, {label: '7', alt: '7', value: '7'}, {label: '6', alt: '6', value: '6'}],
    'm': [{label: '7', alt: 'm7', value: '7'}, {label: 'M7', alt: 'mM7', value: 'mM7'}, {label: '6', alt: 'm6', value: '6'}],
    '°': [{label: '7♭5', alt: '7♭5', value: 'ø7'}, {label: 'dim7', alt: 'dim7', value: '°7'}],
    '+': [{label: '7♯5', alt: '7♯5', value: '7♯5'}, {label: 'M7♯5', alt: 'M7♯5', value: 'M7♯5'}],
    'sus4': [{label: '7', alt: '7sus4', value: '7sus4'}],
    'sus2': [{label: '7', alt: '7sus2', value: '7sus2'}],
};
const ninthTypes: ExtendedChordTypes = {
    // Triads
    'M': [{label: 'add9', alt: 'add9', value: '(add9)'}],
    'm': [{label: 'add9', alt: 'add9', value: '(add9)'}],
    '°': [{label: 'add9', alt: 'add9', value: '°(add9)'}],
    '+': [{label: 'add9', alt: 'add9', value: '+(add9)'}],
    'sus4': [{label: 'add9', alt: 'add9', value: 'sus4(add9)'}],
    '5': [{label: 'add9', alt: 'add9', value: '5(add9)'}],

    // Sevenths
    'M7': [{label: '9', alt: 'M9', value: 'M9'}, {label: '♭9', alt: 'M♭9', value: 'M♭9'}, {label: '♯9', alt: 'M♯9', value: 'M♯9'}],
    '7': [{label: '9', alt: '9', value: '9'}, {label: '♭9', alt: '♭9', value: '♭9'}, {label: '♯9', alt: '♯9', value: '♯9'}],
    'm7': [{label: '9', alt: 'm9', value: '9'}, {label: '♭9', alt: 'm♭9', value: '♭9'}], //
    'mM7': [{label: '9', alt: 'mM9', value: 'mM9'}, {label: '♭9', alt: 'mM♭9', value: 'mM♭9'}],
    '6': [{label: '9', alt: '6/9', value: '6/9'}, {label: '♭9', alt: '6/♭9', value: '6/♭9'}, {label: '♯9', alt: '6/♯9', value: '6/♯9'}],
    'm6': [{label: '9', alt: 'm6/9', value: '6/9'}, {label: '♭9', alt: 'm6/♭9', value: '6/♭9'}], //
    '7♭5': [{label: '9', alt: '9♭5', value: '9♭5'}, {label: '♭9', alt: '♭9♭5', value: '♭9♭5'}],
    'dim7': [{label: '9', alt: '°9♭5', value: '°9♭5'}, {label: '♭9', alt: '°♭9♭5', value: '°♭9♭5'}],
    '7♯5': [{label: '9', alt: '9♯5', value: '9♯5'}, {label: '♭9', alt: '♭9♯5', value: '♭9♯5'}, {label: '♯9', alt: '♯9♯5', value: '♯9♯5'}],
    'M7♯5': [{label: '9', alt: 'M9♯5', value: 'M9♯5'}, {label: '♭9', alt: 'M♭9♯5', value: 'M♭9♯5'}, {label: '♯9', alt: 'M♯9♯5', value: 'M♯9♯5'}],
    '7sus4': [{label: '9', alt: '9sus4', value: '9sus4'}, {label: '♭9', alt: '♭9sus4', value: '♭9sus4'}, {label: '♯9', alt: '♯9sus4', value: '♯9sus4'}],
    '7sus2': [{label: '♭9', alt: '♭9sus2', value: '♭9sus2'}, {label: '♯9', alt: '♯9sus2', value: '♯9sus2'}],
}
const eleventhTypes: ExtendedChordTypes = {
    // Triads
    'M': [{label: 'add11', alt: 'add11', value: '(add11)'}],
    'm': [{label: 'add11', alt: 'add11', value: '(add11)'}],
    '°': [{label: 'add11', alt: 'add11', value: '°(add11)'}],
    '+': [{label: 'add11', alt: 'add11', value: '+(add11)'}],
    'sus2': [{label: 'add11', alt: 'add11', value: 'sus2(add11)'}],
    '5': [{label: 'add11', alt: 'add11', value: '5(add11)'}],

    // Sevenths
    // 'M7': [{label: '11', value: 'M11'}, {label: '♭11', value: 'M♭11'}, {label: '♯11', value: 'M♯11'}],
    // '7': [{label: '11', value: '11'}, {label: '♭11', value: '♭11'}, {label: '♯11', value: '♯11'}],
    // 'm7': [{label: '11', value: 'm11'}, {label: '♭11', value: 'm♭11'}],
    // 'mM7': [{label: '11', value: 'mM11'}, {label: '♭11', value: 'mM♭11'}],
    // '6': [{label: '11', value: '6/11'}, {label: '♭11', value: '6/♭11'}, {label: '♯11', value: '6/♯11'}],
    // 'm6': [{label: '11', value: 'm6/11'}, {label: '♭11', value: 'm6/♭11'}],

    // Ninths
    'M9': [{label: '11', alt: 'M11', value: 'M11'}, {label: '♯11', alt: 'M♯11', value: 'M♯11'}],
    'M♭9': [{label: '11', alt: 'M11♭9', value: 'M11♭9'}, {label: '♯11', alt: 'M♯11♭9', value: 'M♯11♭9'}],
    'M♯9': [{label: '11', alt: 'M11♯9', value: 'M11♯9'}, {label: '♯11', alt: 'M♯11♯9', value: 'M♯11♯9'}],
    '9': [{label: '11', alt: '11', value: '11'}, {label: '♯11', alt: '♯11', value: '♯11'}],
    '♭9': [{label: '11', alt: '11♭9', value: '11♭9'}, {label: '♯11', alt: '♯11♭9', value: '♯11♭9'}],
    '♯9': [{label: '11', alt: '11♯9', value: '11♯9'}, {label: '♯11', alt: '♯11♯9', value: '♯11♯9'}],
    'm9': [{label: '11', alt: 'm11', value: '11'}, {label: '♭11', alt: 'm♭11', value: '♭11'}, {label: '♯11', alt: 'm♯11', value: '♯11'}], //
    'm♭9': [{label: '11', alt: 'm11♭9', value: '11♭9'}, {label: '♭11', alt: 'm♭11♭9', value: '♭11♭9'}, {label: '♯11', alt: 'm♯11♭9', value: '♯11♭9'}], //
    'mM9': [{label: '11', alt: 'mM11', value: 'mM11'}, {label: '♭11', alt: 'mM♭11', value: 'mM♭11'}, {label: '♯11', alt: 'mM♯11', value: 'mM♯11'}],
    'mM♭9': [{label: '11', alt: 'mM11♭9', value: 'mM11♭9'}, {label: '♭11', alt: 'mM♭11♭9', value: 'mM♭11♭9'}, {label: '♯11', alt: 'mM♯11♭9', value: 'mM♯11♭9'}],
    '6/9': [{label: '11', alt: '6/11', value: '6/11'}, {label: '♯11', alt: '6/♯11', value: '6/♯11'}],
    '6/♭9': [{label: '11', alt: '6/11♭9', value: '6/11♭9'}, {label: '♯11', alt: '6/♯11♭9', value: '6/♯11♭9'}],
    '6/♯9': [{label: '11', alt: '6/11♯9', value: '6/11♯9'}, {label: '♯11', alt: '6/♯11♯9', value: '6/♯11♯9'}],
    'm6/9': [{label: '11', alt: 'm6/11', value: '6/11'}, {label: '♭11', alt: 'm6/♭11', value: '6/♭11'}, {label: '♯11', alt: 'm6/♯11', value: '6/♯11'}], //
    'm6/♭9': [{label: '11', alt: 'm6/11♭9', value: '6/11♭9'}, {label: '♭11', alt: 'm6/♭11♭9', value: '6/♭11♭9'}, {label: '♯11', alt: 'm6/♯11♭9', value: '6/♯11♭9'}], //
    '9♭5': [{label: '11', alt: '11♭5', value: '11♭5'}, {label: '♭11', alt: '♭11♭5', value: '♭11♭5'}],
    '♭9♭5': [{label: '11', alt: '11♭9♭5', value: '11♭9♭5'}, {label: '♭11', alt: '♭11♭9♭5', value: '♭11♭9♭5'}],
    '°9♭5': [{label: '11', alt: '°11♭5', value: '°11♭5'}, {label: '♭11', alt: '°♭11♭5', value: '°♭11♭5'}],
    '°♭9♭5': [{label: '11', alt: '°11♭9♭5', value: '°11♭9♭5'}, {label: '♭11', alt: '°♭11♭9♭5', value: '°♭11♭9♭5'}],
    '9♯5': [{label: '11', alt: '11♯5', value: '11♯5'}, {label: '♯11', alt: '♯11♯5', value: '♯11♯5'}],
    '♭9♯5': [{label: '11', alt: '11♭9♯5', value: '11♭9♯5'}, {label: '♯11', alt: '♯11♭9♯5', value: '♯11♭9♯5'}],
    '♯9♯5': [{label: '11', alt: '11♯9♯5', value: '11♯9♯5'}, {label: '♯11', alt: '♯11♯9♯5', value: '♯11♯9♯5'}],
    'M9♯5': [{label: '11', alt: 'M11♯5', value: 'M11♯5'}, {label: '♯11', alt: 'M♯11♯5', value: 'M♯11♯5'}],
    'M♭9♯5': [{label: '11', alt: 'M11♭9♯5', value: 'M11♭9♯5'}, {label: '♯11', alt: 'M♯11♭9♯5', value: 'M♯11♭9♯5'}],
    'M♯9♯5': [{label: '11', alt: 'M11♯9♯5', value: 'M11♯9♯5'}, {label: '♯11', alt: 'M♯11♯9♯5', value: 'M♯11♯9♯5'}],
    '9sus4': [{label: '♭11', alt: '♭11sus4', value: '♭11sus4'}, {label: '♯11', alt: '♯11sus4', value: '♯11sus4'}],
    '♭9sus4': [{label: '♭11', alt: '♭11♭9sus4', value: '♭11♭9sus4'}, {label: '♯11', alt: '♯11♭9sus4', value: '♯11♭9sus4'}],
    '♯9sus4': [{label: '♭11', alt: '♭11♯9sus4', value: '♭11♯9sus4'}, {label: '♯11', alt: '♯11♯9sus4', value: '♯11♯9sus4'}],
    '♭9sus2': [{label: '11', alt: '11♭9sus2', value: '11♭9sus2'}, {label: '♭11', alt: '♭11♭9sus2', value: '♭11♭9sus2'}, {label: '♯11', alt: '♯11♭9sus2', value: '♯11♭9sus2'}],
    '♯9sus2': [{label: '11', alt: '11♯9sus2', value: '11♯9sus2'}, {label: '♭11', alt: '♭11♯9sus2', value: '♭11♯9sus2'}, {label: '♯11', alt: '♯11♯9sus2', value: '♯11♯9sus2'}],
}
const thirteenthTypes: ExtendedChordTypes = {
    // Triads
    'M': [{label: 'add13', alt: 'add13', value: '(add13)'}],
    'm': [{label: 'add13', alt: 'add13', value: '(add13)'}],
    '°': [{label: 'add13', alt: 'add13', value: '°(add13)'}],
    '+': [{label: 'add13', alt: 'add13', value: '+(add13)'}],
    'sus2': [{label: 'add13', alt: 'add13', value: 'sus2(add13)'}],
    '5': [{label: 'add13', alt: 'add13', value: '5(add13)'}],

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
    'M11': [{label: '13', alt: 'M13', value: 'M13'}, {label: '♭13', alt: 'M♭13', value: 'M♭13'}, {label: '♯13', alt: 'M♯13', value: 'M♯13'}],
    'M♯11': [{label: '13', alt: 'M13♯11', value: 'M13♯11'}, {label: '♭13', alt: 'M♭13♯11', value: 'M♭13♯11'}, {label: '♯13', alt: 'M♯13♯11', value: 'M♯13♯11'}],
    'M11♭9': [{label: '13', alt: 'M13♭9', value: 'M13♭9'}, {label: '♭13', alt: 'M♭13♭9', value: 'M♭13♭9'},{label: '♯13', alt: 'M♯13♭9', value: 'M♯13♭9'}],
    'M♯11♭9': [{label: '13', alt: 'M13♯11♭9', value: 'M13♯11♭9'}, {label: '♭13', alt: 'M♭13♯11♭9', value: 'M♭13♯11♭9'},{label: '♯13', alt: 'M♯13♯11♭9', value: 'M♯13♯11♭9'}],
    'M11♯9': [{label: '13', alt: 'M13♯9', value: 'M13♯9'}, {label: '♭13', alt: 'M♭13♯9', value: 'M♭13♯9'},{label: '♯13', alt: 'M♯13♯9', value: 'M♯13♯9'}],
    'M♯11♯9': [{label: '13', alt: 'M13♯11♯9', value: 'M13♯11♯9'}, {label: '♭13', alt: 'M♭13♯11♯9', value: 'M♭13♯11♯9'},{label: '♯13', alt: 'M♯13♯11♯9', value: 'M♯13♯11♯9'}],
    '11': [{label: '13', alt: '13', value: '13'}, {label: '♭13', alt: '♭13', value: '♭13'}, {label: '♯13', alt: '♯13', value: '♯13'}],
    '♯11': [{label: '13', alt: '13♯11', value: '13♯11'}, {label: '♭13', alt: '♭13♯11', value: '♭13♯11'}, {label: '♯13', alt: '♯13♯11', value: '♯13♯11'}],
    '11♭9': [{label: '13', alt: '13♭9', value: '13♭9'}, {label: '♭13', alt: '♭13♭9', value: '♭13♭9'}, {label: '♯13', alt: '♯13♭9', value: '♯13♭9'}],
    '♯11♭9': [{label: '13', alt: '13♯11♭9', value: '13♯11♭9'}, {label: '♭13', alt: '♭13♯11♭9', value: '♭13♯11♭9'}, {label: '♯13', alt: '♯13♯11♭9', value: '♯13♯11♭9'}],
    '11♯9': [{label: '13', alt: '13♯9', value: '13♯9'}, {label: '♭13', alt: '♭13♯9', value: '♭13♯9'}, {label: '♯13', alt: '♯13♯9', value: '♯13♯9'}],
    '♯11♯9': [{label: '13', alt: '13♯11♯9', value: '13♯11♯9'}, {label: '♭13', alt: '♭13♯11♯9', value: '♭13♯11♯9'}, {label: '♯13', alt: '♯13♯11♯9', value: '♯13♯11♯9'}],
    'm11': [{label: '13', alt: 'm13', value: '13'}, {label: '♭13', alt: 'm♭13', value: '♭13'}], //
    'm♭11': [{label: '13', alt: 'm13♭11', value: '13♭11'}, {label: '♭13', alt: 'm♭13♭11', value: '♭13♭11'}], //
    'm♯11': [{label: '13', alt: 'm13♯11', value: '13♯11'}, {label: '♭13', alt: 'm♭13♯11', value: '♭13♯11'}], //
    'm11♭9': [{label: '13', alt: 'm13♭9', value: '13♭9'}, {label: '♭13', alt: 'm♭13♭9', value: '♭13♭9'}], //
    'm♭11♭9': [{label: '13', alt: 'm13♭11♭9', value: '13♭11♭9'}, {label: '♭13', alt: 'm♭13♭11♭9', value: '♭13♭11♭9'}], //
    'm♯11♭9': [{label: '13', alt: 'm13♯11♭9', value: '13♯11♭9'}, {label: '♭13', alt: 'm♭13♯11♭9', value: '♭13♯11♭9'}], //
    'mM11': [{label: '13', alt: 'mM13', value: 'mM13'}, {label: '♭13', alt: 'mM♭13', value: 'mM♭13'}, {label: '♯13', alt: 'mM♯13', value: 'mM♯13'}],
    'mM♭11': [{label: '13', alt: 'mM13♭11', value: 'mM13♭11'}, {label: '♭13', alt: 'mM♭13♭11', value: 'mM♭13♭11'}, {label: '♯13', alt: 'mM♯13♭11', value: 'mM♯13♭11'}],
    'mM♯11': [{label: '13', alt: 'mM13♯11', value: 'mM13♯11'}, {label: '♭13', alt: 'mM♭13♯11', value: 'mM♭13♯11'}, {label: '♯13', alt: 'mM♯13♯11', value: 'mM♯13♯11'}],
    'mM11♭9': [{label: '13', alt: 'mM13♭9', value: 'mM13♭9'}, {label: '♭13', alt: 'mM♭13♭9', value: 'mM♭13♭9'}, {label: '♯13', alt: 'mM♯13♭9', value: 'mM♯13♭9'}],
    'mM♭11♭9': [{label: '13', alt: 'mM13♭11♭9', value: 'mM13♭11♭9'}, {label: '♭13', alt: 'mM♭13♭11♭9', value: 'mM♭13♭11♭9'}, {label: '♯13', alt: 'mM♯13♭11♭9', value: 'mM♯13♭11♭9'}],
    'mM♯11♭9': [{label: '13', alt: 'mM13♯11♭9', value: 'mM13♯11♭9'}, {label: '♭13', alt: 'mM♭13♯11♭9', value: 'mM♭13♯11♭9'}, {label: '♯13', alt: 'mM♯13♯11♭9', value: 'mM♯13♯11♭9'}],
    '6/11': [{label: '♭13', alt: '6/♭13', value: '6/♭13'}, {label: '♯13', alt: '6/♯13', value: '6/♯13'}],
    '6/♯11': [{label: '♭13', alt: '6/♭13♯11', value: '6/♭13♯11'}, {label: '♯13', alt: '6/♯13♯11', value: '6/♯13♯11'}],
    '6/11♭9': [{label: '♭13', alt: '6/♭13♭9', value: '6/♭13♭9'}, {label: '♯13', alt: '6/♯13♭9', value: '6/♯13♭9'}],
    '6/♯11♭9': [{label: '♭13', alt: '6/♭13♯11♭9', value: '6/♭13♯11♭9'}, {label: '♯13', alt: '6/♯13♯11♭9', value: '6/♯13♯11♭9'}],
    '6/11♯9': [{label: '♭13', alt: '6/♭13♯9', value: '6/♭13♯9'}, {label: '♯13', alt: '6/♯13♯9', value: '6/♯13♯9'}],
    '6/♯11♯9': [{label: '♭13', alt: '6/♭13♯11♯9', value: '6/♭13♯11♯9'}, {label: '♯13', alt: '6/♯13♯11♯9', value: '6/♯13♯11♯9'}],
    'm6/11': [{label: '♭13', alt: '6/♭13', value: '6/♭13'}, {label: '♯13', alt: '6/♯13', value: '6/♯13'}], //
    'm6/♭11': [{label: '♭13', alt: '6/♭13♭11', value: '6/♭13♭11'}, {label: '♯13', alt: '6/♯13♭11', value: '6/♯13♭11'}], //
    'm6/♯11': [{label: '♭13', alt: '6/♭13♯11', value: '6/♭13♯11'}, {label: '♯13', alt: '6/♯13♯11', value: '6/♯13♯11'}], //
    'm6/11♭9': [{label: '♭13', alt: '6/♭13♭9', value: '6/♭13♭9'}, {label: '♯13', alt: '6/♯13♭9', value: '6/♯13♭9'}], //
    'm6/♭11♭9': [{label: '♭13', alt: '6/♭13♭11♭9', value: '6/♭13♭11♭9'}, {label: '♯13', alt: '6/♯13♭11♭9', value: '6/♯13♭11♭9'}], //
    'm6/♯11♭9': [{label: '♭13', alt: '6/♭13♯11♭9', value: '6/♭13♯11♭9'}, {label: '♯13', alt: '6/♯13♯11♭9', value: '6/♯13♯11♭9'}], //
    '11♭5': [{label: '♭13', alt: '♭13♭5', value: '♭13♭5'}, {label: '♯13', alt: '♯13♭5', value: '♯13♭5'}],
    '♭11♭5': [{label: '♭13', alt: '♭13♭11♭5', value: '♭13♭11♭5'}, {label: '♯13', alt: '♯13♭11♭5', value: '♯13♭11♭5'}],
    '11♭9♭5': [{label: '♭13', alt: '♭13♭9♭5', value: '♭13♭9♭5'}, {label: '♯13', alt: '♯13♭9♭5', value: '♯13♭9♭5'}],
    '♭11♭9♭5': [{label: '♭13', alt: '♭13♭11♭9♭5', value: '♭13♭11♭9♭5'}, {label: '♯13', alt: '♯13♭11♭9♭5', value: '♯13♭11♭9♭5'}],
    '°11♭5': [{label: '♭13', alt: '°♭13♭5', value: '°♭13♭5'}, {label: '♯13', alt: '°♯13♭5', value: '°♯13♭5'}],
    '°♭11♭5': [{label: '♭13', alt: '°♭13♭11♭5', value: '°♭13♭11♭5'}, {label: '♯13', alt: '°♯13♭11♭5', value: '°♯13♭11♭5'}],
    '°11♭9♭5': [{label: '♭13', alt: '°♭13♭9♭5', value: '°♭13♭9♭5'}, {label: '♯13', alt: '°♯13♭9♭5', value: '°♯13♭9♭5'}],
    '°♭11♭9♭5': [{label: '♭13', alt: '°♭13♭11♭9♭5', value: '°♭13♭11♭9♭5'}, {label: '♯13', alt: '°♯13♭11♭9♭5', value: '°♯13♭11♭9♭5'}],
    '11♯5': [{label: '13', alt: '13♯5', value: '13♯5'}],
    '♯11♯5': [{label: '13', alt: '13♯11♯5', value: '13♯11♯5'}],
    '11♭9♯5': [{label: '13', alt: '13♭9♯5', value: '13♭9♯5'}],
    '♯11♭9♯5': [{label: '13', alt: '13♯11♭9♯5', value: '13♯11♭9♯5'}],
    '11♯9♯5': [{label: '13', alt: '13♯9♯5', value: '13♯9♯5'}],
    '♯11♯9♯5': [{label: '13', alt: '13♯11♯9♯5', value: '13♯11♯9♯5'}],
    'M11♯5': [{label: '13', alt: 'M13♯5', value: 'M13♯5'}, {label: '♯13', alt: 'M♯13♯5', value: 'M♯13♯5'}],
    'M♯11♯5': [{label: '13', alt: 'M13♯11♯5', value: 'M13♯11♯5'}, {label: '♯13', alt: 'M♯13♯11♯5', value: 'M♯13♯11♯5'}],
    'M11♭9♯5': [{label: '13', alt: 'M13♭9♯5', value: 'M13♭9♯5'}, {label: '♯13', alt: 'M♯13♭9♯5', value: 'M♯13♭9♯5'}],
    'M♯11♭9♯5': [{label: '13', alt: 'M13♯11♭9♯5', value: 'M13♯11♭9♯5'}, {label: '♯13', alt: 'M♯13♯11♭9♯5', value: 'M♯13♯11♭9♯5'}],
    'M11♯9♯5': [{label: '13', alt: 'M13♯9♯5', value: 'M13♯9♯5'}, {label: '♯13', alt: 'M♯13♯9♯5', value: 'M♯13♯9♯5'}],
    'M♯11♯9♯5': [{label: '13', alt: 'M13♯11♯9♯5', value: 'M13♯11♯9♯5'}, {label: '♯13', alt: 'M♯13♯11♯9♯5', value: 'M♯13♯11♯9♯5'}],
    '♭11sus4': [{label: '13', alt: '13♭11sus4', value: '13♭11sus4'}, {label: '♭13', alt: '♭13♭11sus4', value: '♭13♭11sus4'}],
    '♯11sus4': [{label: '13', alt: '13♯11sus4', value: '13♯11sus4'}, {label: '♭13', alt: '♭13♯11sus4', value: '♭13♯11sus4'}],
    '♭11♭9sus4': [{label: '13', alt: '13♭11♭9sus4', value: '13♭11♭9sus4'}, {label: '♭13', alt: '♭13♭11♭9sus4', value: '♭13♭11♭9sus4'}],
    '♯11♭9sus4': [{label: '13', alt: '13♯11♭9sus4', value: '13♯11♭9sus4'}, {label: '♭13', alt: '♭13♯11♭9sus4', value: '♭13♯11♭9sus4'}],
    '♭11♯9sus4': [{label: '13', alt: '13♭11♯9sus4', value: '13♭11♯9sus4'}, {label: '♭13', alt: '♭13♭11♯9sus4', value: '♭13♭11♯9sus4'}],
    '♯11♯9sus4': [{label: '13', alt: '13♯11♯9sus4', value: '13♯11♯9sus4'}, {label: '♭13', alt: '♭13♯11♯9sus4', value: '♭13♯11♯9sus4'}],
    '11♭9sus2': [{label: '13', alt: '13♭9sus2', value: '13♭9sus2'}, {label: '♭13', alt: '♭13♭9sus2', value: '♭13♭9sus2'}],
    '♭11♭9sus2': [{label: '13', alt: '13♭11♭9sus2', value: '13♭11♭9sus2'}, {label: '♭13', alt: '♭13♭11♭9sus2', value: '♭13♭11♭9sus2'}],
    '♯11♭9sus2': [{label: '13', alt: '13♯11♭9sus2', value: '13♯11♭9sus2'}, {label: '♭13', alt: '♭13♯11♭9sus2', value: '♭13♯11♭9sus2'}],
    '11♯9sus2': [{label: '13', alt: '13♯9sus2', value: '13♯9sus2'}, {label: '♭13', alt: '♭13♯9sus2', value: '♭13♯9sus2'}],
    '♭11♯9sus2': [{label: '13', alt: '13♭11♯9sus2', value: '13♭11♯9sus2'}, {label: '♭13', alt: '♭13♭11♯9sus2', value: '♭13♭11♯9sus2'}],
    '♯11♯9sus2': [{label: '13', alt: '13♯11♯9sus2', value: '13♯11♯9sus2'}, {label: '♭13', alt: '♭13♯11♯9sus2', value: '♭13♯11♯9sus2'}],
}

function ChordKeyboard({ onChordComplete }: { onChordComplete: (chord: string) => void }) {
    const darkMode = useTheme();

    const [chords, setChords] = useState<string[]>([]);
    
    const [flat, setFlat] = useState<boolean>(false);
    const [sharp, setSharp] = useState<boolean>(false);

    const [selectedRomanNumeral, setSelectedRomanNumeral] = useState<RomanNumeral | null>(null);
    const [selectedTriad, setSelectedTriad] = useState<ChordType | null>(null);
    const [selectedSeventh, setSelectedSeventh] = useState<ChordType | null>(null);
    const [selectedNinth, setSelectedNinth] = useState<ChordType | null>(null);
    const [selectedEleventh, setSelectedEleventh] = useState<ChordType | null>(null);
    const [selectedThirteenth, setSelectedThirteenth] = useState<ChordType | null>(null);

    const handleRomanNumeralPress = (numeral: RomanNumeral) => {
        setSelectedRomanNumeral(numeral);
        setSelectedTriad(null);
        setSelectedSeventh(null);
        setSelectedNinth(null);
        setSelectedEleventh(null);
        setSelectedThirteenth(null);
    };

    const handleTriadPress = (triad: ChordType) => {
        setSelectedTriad(triad);
        setSelectedSeventh(triad);
        setSelectedNinth(triad);
        setSelectedEleventh(triad);
        setSelectedThirteenth(triad);
    }

    const handleSeventhPress = (seventh: ChordType) => {
        setSelectedSeventh(seventh);
        setSelectedNinth(seventh);
        setSelectedEleventh(seventh);
        setSelectedThirteenth(seventh);
    }

    const handleNinthPress = (ninth: ChordType) => {
        setSelectedNinth(ninth);
        setSelectedEleventh(ninth);
        setSelectedThirteenth(ninth);
    }

    const handleEleventhPress = (eleventh: ChordType) => {
        setSelectedEleventh(eleventh);
        setSelectedThirteenth(eleventh);
    }

    const handleThirteenthPress = (thirteenth: ChordType) => {
        setSelectedThirteenth(thirteenth);
    }

    const handleFlatPress = () => {
        if (selectedRomanNumeral) {
            setFlat(!flat);
            setSharp(false);
        }
    }

    const handleSharpPress = () => {
        if (selectedRomanNumeral) {
            setSharp(!sharp);
            setFlat(false);
        }
    }

    const handleErasePress = () => {
        setChords(chords.slice(0, -1));
        onChordComplete(chords.slice(0, -1).join('-').replace(/-\s-/g, ' '));
    }

    const handleSpacePress = () => {
        if (chords[chords.length - 1] !== ' ') { // prevent multiple spaces
            setChords([...chords, ' ']);
            onChordComplete([...chords, ' '].join('-').replace(/-\s/g, ' ')); // hide dash before space
        }
    }
    
    const handleChordComplete = () => {
        let completeChord = '';

        if (selectedRomanNumeral && selectedTriad) {
            if (selectedTriad === selectedSeventh && 
                selectedSeventh === selectedNinth && 
                selectedNinth === selectedEleventh && 
                selectedEleventh === selectedThirteenth) { // triads

                if (selectedTriad.label === 'm' || selectedTriad.label === '°') {
                    completeChord = selectedRomanNumeral.toLowerCase() + selectedTriad.value;
                } else {
                    completeChord = selectedRomanNumeral + selectedTriad.value;
                }
            } else if (selectedSeventh === selectedNinth && 
                selectedNinth === selectedEleventh &&
                selectedEleventh === selectedThirteenth) { // seventh chords
                
                if (selectedTriad.label === 'm' || selectedTriad.label === '°') {
                    completeChord = selectedRomanNumeral.toLowerCase() + selectedSeventh?.value;
                } else {
                    completeChord = selectedRomanNumeral + selectedSeventh?.value;
                }
            } else if (selectedNinth === selectedEleventh && 
                selectedEleventh === selectedThirteenth) { // ninth chords
                
                if (selectedTriad.label === 'm' || selectedTriad.label === '°') {
                    completeChord = selectedRomanNumeral.toLowerCase() + selectedNinth?.value;
                } else {
                    completeChord = selectedRomanNumeral + selectedNinth?.value;
                }
            } else if (selectedEleventh === selectedThirteenth) { // eleventh chords
                    
                if (selectedTriad.label === 'm' || selectedTriad.label === '°') {
                    completeChord = selectedRomanNumeral.toLowerCase() + selectedEleventh?.value;
                } else {
                    completeChord = selectedRomanNumeral + selectedEleventh?.value;
                }
            } else if (selectedThirteenth) { // thirteenth chords
                
                if (selectedTriad.label === 'm' || selectedTriad.label === '°') {
                    completeChord = selectedRomanNumeral.toLowerCase() + selectedThirteenth?.value;
                } else {
                    completeChord = selectedRomanNumeral + selectedThirteenth?.value;
                }
            }

            if (flat) {
                completeChord = '♭' + completeChord;
            } else if (sharp) {
                completeChord = '♯' + completeChord;
            }

            setChords([...chords, completeChord]);
            onChordComplete([...chords, completeChord].join('-').replace(/-\s-/g, ' '));

            setFlat(false);
            setSharp(false);

            setSelectedRomanNumeral(null);
            setSelectedTriad(null);
            setSelectedSeventh(null);
            setSelectedNinth(null);
            setSelectedEleventh(null);
            setSelectedThirteenth(null);
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
                    {selectedRomanNumeral && triadTypes.map((triad, index) => (
                    <ChordTypeButton
                        key={index}
                        chordType={triad}
                        onPress={handleTriadPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedTriad && seventhTypes[selectedTriad.alt] && seventhTypes[selectedTriad.alt].map((seventh, index) => (
                    <ChordTypeButton
                        key={index}
                        chordType={seventh}
                        onPress={handleSeventhPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedSeventh && ninthTypes[selectedSeventh.alt] && ninthTypes[selectedSeventh.alt].map((ninth, index) => (
                    <ChordTypeButton
                        key={index}
                        chordType={ninth}
                        onPress={handleNinthPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedNinth && eleventhTypes[selectedNinth.alt] && eleventhTypes[selectedNinth.alt].map((eleventh, index) => (
                    <ChordTypeButton
                        key={index}
                        chordType={eleventh}
                        onPress={handleEleventhPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={styles.column}>
                <ScrollView>
                    {selectedEleventh && thirteenthTypes[selectedEleventh.alt] && thirteenthTypes[selectedEleventh.alt].map((thirteenth, index) => (
                    <ChordTypeButton
                        key={index}
                        chordType={thirteenth}
                        onPress={handleThirteenthPress}
                    />
                    ))}
                </ScrollView>
            </View>
            <View style={{ position: 'absolute', right: 5, bottom: 10, flexDirection: 'column', gap: 10 }}>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
                    <FAB
                        style={{ backgroundColor: '#009788' }}
                        color={!darkMode ? "white" : "black"}
                        label='('
                        onPress={() => {}}
                        size='small'
                        customSize={40}
                    />
                    <FAB
                        style={{ backgroundColor: '#009788' }}
                        color={!darkMode ? "white" : "black"}
                        label=')'
                        onPress={() => {}}
                        size='small'
                        customSize={40}
                    />
                    <FAB
                        style={{ backgroundColor: '#009788' }}
                        color={!darkMode ? "white" : "black"}
                        label='♭'
                        onPress={handleFlatPress}
                        size='small'
                        customSize={40}
                    />
                    <FAB
                        style={{ backgroundColor: '#009788' }}
                        color={!darkMode ? "white" : "black"}
                        label='♯'
                        onPress={handleSharpPress}
                        size='small'
                        customSize={40}
                    />
                </View>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'flex-end' }}>
                    <FAB
                        style={{ backgroundColor: '#009788' }}
                        color={!darkMode ? "white" : "black"}
                        icon='eraser'
                        onPress={handleErasePress}
                    />
                    <FAB
                        style={{ backgroundColor: '#009788' }}
                        color={!darkMode ? "white" : "black"}
                        label='SPACE'
                        uppercase={true}
                        onPress={handleSpacePress}
                    />
                    <FAB
                        style={{ backgroundColor: '#009788' }}
                        color={!darkMode ? "white" : "black"}
                        icon="arrow-right"
                        onPress={handleChordComplete}
                    />
                </View>
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