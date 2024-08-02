import { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Button } from 'react-native';
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
    'M7': [{label: '9', alt: 'M9', value: 'M9'}, {label: '♭9', alt: 'M7♭9', value: 'M7♭9'}, {label: '♯9', alt: 'M7♯9', value: 'M7♯9'}],
    '7': [{label: '9', alt: '9', value: '9'}, {label: '♭9', alt: '7♭9', value: '7♭9'}, {label: '♯9', alt: '7♯9', value: '7♯9'}],
    'm7': [{label: '9', alt: 'm9', value: '9'}, {label: '♭9', alt: 'm7♭9', value: '7♭9'}],
    'mM7': [{label: '9', alt: 'mM9', value: 'mM9'}, {label: '♭9', alt: 'mM7♭9', value: 'mM7♭9'}],
    '6': [{label: '9', alt: '6/9', value: '6/9'}, {label: '♭9', alt: '6/♭9', value: '6/♭9'}, {label: '♯9', alt: '6/♯9', value: '6/♯9'}],
    'm6': [{label: '9', alt: 'm6/9', value: '6/9'}, {label: '♭9', alt: 'm6/♭9', value: '6/♭9'}],
    '7♭5': [{label: '9', alt: '9♭5', value: '9♭5'}, {label: '♭9', alt: '7♭5♭9', value: '7♭5♭9'}],
    'dim7': [{label: '9', alt: '°9♭5', value: '°9♭5'}, {label: '♭9', alt: '°7♭5♭9', value: '°7♭5♭9'}],
    '7♯5': [{label: '9', alt: '9♯5', value: '9♯5'}, {label: '♭9', alt: '7♯5♭9', value: '7♯5♭9'}, {label: '♯9', alt: '7♯5♯9', value: '7♯5♯9'}],
    'M7♯5': [{label: '9', alt: 'M9♯5', value: 'M9♯5'}, {label: '♭9', alt: 'M7♯5♭9', value: 'M7♯5♭9'}, {label: '♯9', alt: 'M7♯5♯9', value: 'M7♯5♯9'}],
    '7sus4': [{label: '9', alt: '9sus4', value: '9sus4'}, {label: '♭9', alt: '7♭9sus4', value: '7♭9sus4'}, {label: '♯9', alt: '7♯9sus4', value: '7♯9sus4'}],
    '7sus2': [{label: '♭9', alt: '7♭9sus2', value: '7♭9sus2'}, {label: '♯9', alt: '7♯9sus2', value: '7♯9sus2'}],
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
    'M9': [{label: '11', alt: 'M11', value: 'M11'}, {label: '♯11', alt: 'M9♯11', value: 'M9♯11'}],
    'M7♭9': [{label: '11', alt: 'M11♭9', value: 'M11♭9'}, {label: '♯11', alt: 'M7♭9♯11', value: 'M7♭9♯11'}],
    'M7♯9': [{label: '11', alt: 'M11♯9', value: 'M11♯9'}, {label: '♯11', alt: 'M7♯9♯11', value: 'M7♯9♯11'}],
    '9': [{label: '11', alt: '11', value: '11'}, {label: '♯11', alt: '9♯11', value: '9♯11'}],
    '7♭9': [{label: '11', alt: '11♭9', value: '11♭9'}, {label: '♯11', alt: '7♭9♯11', value: '7♭9♯11'}],
    '7♯9': [{label: '11', alt: '11♯9', value: '11♯9'}, {label: '♯11', alt: '7♯9♯11', value: '7♯9♯11'}],
    'm9': [{label: '11', alt: 'm11', value: '11'}, {label: '♭11', alt: 'm9♭11', value: '9♭11'}, {label: '♯11', alt: 'm9♯11', value: '9♯11'}],
    'm7♭9': [{label: '11', alt: 'm11♭9', value: '11♭9'}, {label: '♭11', alt: 'm7♭9♭11', value: '7♭9♭11'}, {label: '♯11', alt: 'm7♭9♯11', value: '7♭9♯11'}],
    'mM9': [{label: '11', alt: 'mM11', value: 'mM11'}, {label: '♭11', alt: 'mM9♭11', value: 'mM9♭11'}, {label: '♯11', alt: 'mM9♯11', value: 'mM9♯11'}],
    'mM7♭9': [{label: '11', alt: 'mM11♭9', value: 'mM11♭9'}, {label: '♭11', alt: 'mM7♭9♭11', value: 'mM7♭9♭11'}, {label: '♯11', alt: 'mM7♭9♯11', value: 'mM7♭9♯11'}],
    '6/9': [{label: '11', alt: '6/11', value: '6/11'}, {label: '♯11', alt: '6/9♯11', value: '6/9♯11'}],
    '6/♭9': [{label: '11', alt: '6/11♭9', value: '6/11♭9'}, {label: '♯11', alt: '6/♭9♯11', value: '6/♭9♯11'}],
    '6/♯9': [{label: '11', alt: '6/11♯9', value: '6/11♯9'}, {label: '♯11', alt: '6/♯9♯11', value: '6/♯9♯11'}],
    'm6/9': [{label: '11', alt: 'm6/11', value: '6/11'}, {label: '♭11', alt: 'm6/9♭11', value: '6/9♭11'}, {label: '♯11', alt: 'm6/9♯11', value: '6/9♯11'}],
    'm6/♭9': [{label: '11', alt: 'm6/11♭9', value: '6/11♭9'}, {label: '♭11', alt: 'm6/♭9♭11', value: '6/♭9♭11'}, {label: '♯11', alt: 'm6/♭9♯11', value: '6/♭9♯11'}],
    '9♭5': [{label: '11', alt: '11♭5', value: '11♭5'}, {label: '♭11', alt: '9♭5♭11', value: '9♭5♭11'}],
    '7♭5♭9': [{label: '11', alt: '11♭5♭9', value: '11♭5♭9'}, {label: '♭11', alt: '7♭5♭9♭11', value: '7♭5♭9♭11'}],
    '°9♭5': [{label: '11', alt: '°11♭5', value: '°11♭5'}, {label: '♭11', alt: '°9♭5♭11', value: '°9♭5♭11'}],
    '°7♭5♭9': [{label: '11', alt: '°11♭5♭9', value: '°11♭5♭9'}, {label: '♭11', alt: '°7♭5♭9♭11', value: '°7♭5♭9♭11'}],
    '9♯5': [{label: '11', alt: '11♯5', value: '11♯5'}, {label: '♯11', alt: '9♯5♯11', value: '9♯5♯11'}],
    '7♯5♭9': [{label: '11', alt: '11♯5♭9', value: '11♯5♭9'}, {label: '♯11', alt: '7♯5♭9♯11', value: '7♯5♭9♯11'}],
    '7♯5♯9': [{label: '11', alt: '11♯5♯9', value: '11♯5♯9'}, {label: '♯11', alt: '7♯5♯9♯11', value: '7♯5♯9♯11'}],
    'M9♯5': [{label: '11', alt: 'M11♯5', value: 'M11♯5'}, {label: '♯11', alt: 'M9♯5♯11', value: 'M9♯5♯11'}],
    'M7♯5♭9': [{label: '11', alt: 'M11♯5♭9', value: 'M11♯5♭9'}, {label: '♯11', alt: 'M7♯5♭9♯11', value: 'M7♯5♭9♯11'}],
    'M7♯5♯9': [{label: '11', alt: 'M11♯5♯9', value: 'M11♯5♯9'}, {label: '♯11', alt: 'M7♯5♯9♯11', value: 'M7♯5♯9♯11'}],
    '9sus4': [{label: '♭11', alt: '9♭11sus4', value: '9♭11sus4'}, {label: '♯11', alt: '9♯11sus4', value: '9♯11sus4'}],
    '7♭9sus4': [{label: '♭11', alt: '7♭9♭11sus4', value: '7♭9♭11sus4'}, {label: '♯11', alt: '7♭9♯11sus4', value: '7♭9♯11sus4'}],
    '7♯9sus4': [{label: '♭11', alt: '7♯9♭11sus4', value: '7♯9♭11sus4'}, {label: '♯11', alt: '7♯9♯11sus4', value: '7♯9♯11sus4'}],
    '7♭9sus2': [{label: '11', alt: '11♭9sus2', value: '11♭9sus2'}, {label: '♭11', alt: '7♭9♭11sus2', value: '7♭9♭11sus2'}, {label: '♯11', alt: '7♭9♯11sus2', value: '7♭9♯11sus2'}],
    '7♯9sus2': [{label: '11', alt: '11♯9sus2', value: '11♯9sus2'}, {label: '♭11', alt: '7♯9♭11sus2', value: '7♯9♭11sus2'}, {label: '♯11', alt: '7♯9♯11sus2', value: '7♯9♯11sus2'}],
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
    // 'M♭9': [{label: '13', value: 'M13♭9'}, {label: '♯13', value: 'M♭9♯13'}],
    // 'M♯9': [{label: '13', value: 'M13♯9'}, {label: '♯13', value: 'M♯9♯13'}],
    // '9': [{label: '13', value: '13'}, {label: '♯13', value: '♯13'}],
    // '♭9': [{label: '13', value: '13♭9'}, {label: '♯13', value: '♭9♯13'}],
    // '♯9': [{label: '13', value: '13♯9'}, {label: '♯13', value: '♯9♯13'}],

    // Elevenths
    'M11': [{label: '13', alt: 'M13', value: 'M13'}, {label: '♭13', alt: 'M11♭13', value: 'M11♭13'}, {label: '♯13', alt: 'M11♯13', value: 'M11♯13'}],
    'M9♯11': [{label: '13', alt: 'M13♯11', value: 'M13♯11'}, {label: '♭13', alt: 'M9♯11♭13', value: 'M9♯11♭13'}, {label: '♯13', alt: 'M9♯11♯13', value: 'M9♯11♯13'}],
    'M11♭9': [{label: '13', alt: 'M13♭9', value: 'M13♭9'}, {label: '♭13', alt: 'M11♭9♭13', value: 'M11♭9♭13'},{label: '♯13', alt: 'M11♭9♯13', value: 'M11♭9♯13'}],
    'M7♭9♯11': [{label: '13', alt: 'M13♭9♯11', value: 'M13♭9♯11'}, {label: '♭13', alt: 'M7♭9♯11♭13', value: 'M7♭9♯11♭13'},{label: '♯13', alt: 'M7♭9♯11♯13', value: 'M7♭9♯11♯13'}],
    'M11♯9': [{label: '13', alt: 'M13♯9', value: 'M13♯9'}, {label: '♭13', alt: 'M11♯9♭13', value: 'M11♯9♭13'},{label: '♯13', alt: 'M11♯9♯13', value: 'M11♯9♯13'}],
    'M7♯9♯11': [{label: '13', alt: 'M13♯9♯11', value: 'M13♯9♯11'}, {label: '♭13', alt: 'M7♯9♯11♭13', value: 'M7♯9♯11♭13'},{label: '♯13', alt: 'M7♯9♯11♯13', value: 'M7♯9♯11♯13'}],
    '11': [{label: '13', alt: '13', value: '13'}, {label: '♭13', alt: '11♭13', value: '11♭13'}, {label: '♯13', alt: '11♯13', value: '11♯13'}],
    '9♯11': [{label: '13', alt: '13♯11', value: '13♯11'}, {label: '♭13', alt: '9♯11♭13', value: '9♯11♭13'}, {label: '♯13', alt: '9♯11♯13', value: '9♯11♯13'}],
    '11♭9': [{label: '13', alt: '13♭9', value: '13♭9'}, {label: '♭13', alt: '11♭9♭13', value: '11♭9♭13'}, {label: '♯13', alt: '11♭9♯13', value: '11♭9♯13'}],
    '7♭9♯11': [{label: '13', alt: '13♭9♯11', value: '13♭9♯11'}, {label: '♭13', alt: '7♭9♯11♭13', value: '7♭9♯11♭13'}, {label: '♯13', alt: '7♭9♯11♯13', value: '7♭9♯11♯13'}],
    '11♯9': [{label: '13', alt: '13♯9', value: '13♯9'}, {label: '♭13', alt: '11♯9♭13', value: '11♯9♭13'}, {label: '♯13', alt: '11♯9♯13', value: '11♯9♯13'}],
    '7♯9♯11': [{label: '13', alt: '13♯9♯11', value: '13♯9♯11'}, {label: '♭13', alt: '7♯9♯11♭13', value: '7♯9♯11♭13'}, {label: '♯13', alt: '7♯9♯11♯13', value: '7♯9♯11♯13'}],
    'm11': [{label: '13', alt: 'm13', value: '13'}, {label: '♭13', alt: 'm11♭13', value: '11♭13'}],
    'm9♭11': [{label: '13', alt: 'm13♭11', value: '13♭11'}, {label: '♭13', alt: 'm9♭11♭13', value: '9♭11♭13'}],
    'm9♯11': [{label: '13', alt: 'm13♯11', value: '13♯11'}, {label: '♭13', alt: 'm9♯11♭13', value: '9♯11♭13'}],
    'm11♭9': [{label: '13', alt: 'm13♭9', value: '13♭9'}, {label: '♭13', alt: 'm11♭9♭13', value: '11♭9♭13'}],
    'm7♭9♭11': [{label: '13', alt: 'm13♭9♭11', value: '13♭9♭11'}, {label: '♭13', alt: 'm7♭9♭11♭13', value: '7♭9♭11♭13'}],
    'm7♭9♯11': [{label: '13', alt: 'm13♭9♯11', value: '13♭9♯11'}, {label: '♭13', alt: 'm7♭9♯11♭13', value: '7♭9♯11♭13'}],
    'mM11': [{label: '13', alt: 'mM13', value: 'mM13'}, {label: '♭13', alt: 'mM11♭13', value: 'mM11♭13'}, {label: '♯13', alt: 'mM11♯13', value: 'mM11♯13'}],
    'mM9♭11': [{label: '13', alt: 'mM13♭11', value: 'mM13♭11'}, {label: '♭13', alt: 'mM9♭11♭13', value: 'mM9♭11♭13'}, {label: '♯13', alt: 'mM9♭11♯13', value: 'mM9♭11♯13'}],
    'mM9♯11': [{label: '13', alt: 'mM13♯11', value: 'mM13♯11'}, {label: '♭13', alt: 'mM9♯11♭13', value: 'mM9♯11♭13'}, {label: '♯13', alt: 'mM9♯11♯13', value: 'mM9♯11♯13'}],
    'mM11♭9': [{label: '13', alt: 'mM13♭9', value: 'mM13♭9'}, {label: '♭13', alt: 'mM11♭9♭13', value: 'mM11♭9♭13'}, {label: '♯13', alt: 'mM11♭9♯13', value: 'mM11♭9♯13'}],
    'mM7♭9♭11': [{label: '13', alt: 'mM13♭9♭11', value: 'mM13♭9♭11'}, {label: '♭13', alt: 'mM7♭9♭11♭13', value: 'mM7♭9♭11♭13'}, {label: '♯13', alt: 'mM7♭9♭11♯13', value: 'mM7♭9♭11♯13'}],
    'mM7♭9♯11': [{label: '13', alt: 'mM13♭9♯11', value: 'mM13♭9♯11'}, {label: '♭13', alt: 'mM♭9♯11♭13', value: 'mM♭9♯11♭13'}, {label: '♯13', alt: 'mM♭9♯11♯13', value: 'mM♭9♯11♯13'}],
    '6/11': [{label: '♭13', alt: '6/11♭13', value: '6/11♭13'}, {label: '♯13', alt: '6/11♯13', value: '6/11♯13'}],
    '6/9♯11': [{label: '♭13', alt: '6/9♯11♭13', value: '6/9♯11♭13'}, {label: '♯13', alt: '6/9♯11♯13', value: '6/9♯11♯13'}],
    '6/11♭9': [{label: '♭13', alt: '6/11♭9♭13', value: '6/11♭9♭13'}, {label: '♯13', alt: '6/11♭9♯13', value: '6/11♭9♯13'}],
    '6/♭9♯11': [{label: '♭13', alt: '6/♭9♯11♭13', value: '6/♭9♯11♭13'}, {label: '♯13', alt: '6/♭9♯11♯13', value: '6/♭9♯11♯13'}],
    '6/11♯9': [{label: '♭13', alt: '6/11♯9♭13', value: '6/11♯9♭13'}, {label: '♯13', alt: '6/11♯9♯13', value: '6/11♯9♯13'}],
    '6/♯9♯11': [{label: '♭13', alt: '6/♯9♯11♭13', value: '6/♯9♯11♭13'}, {label: '♯13', alt: '6/♯9♯11♯13', value: '6/♯9♯11♯13'}],
    'm6/11': [{label: '♭13', alt: 'm6/11♭13', value: '6/11♭13'}, {label: '♯13', alt: 'm6/11♯13', value: '6/11♯13'}],
    'm6/9♭11': [{label: '♭13', alt: 'm6/9♭11♭13', value: '6/9♭11♭13'}, {label: '♯13', alt: 'm6/9♭11♯13', value: '6/9♭11♯13'}],
    'm6/9♯11': [{label: '♭13', alt: 'm6/9♯11♭13', value: '6/9♯11♭13'}, {label: '♯13', alt: 'm6/9♯11♯13', value: '6/9♯11♯13'}],
    'm6/11♭9': [{label: '♭13', alt: 'm6/11♭9♭13', value: '6/11♭9♭13'}, {label: '♯13', alt: 'm6/11♭9♯13', value: '6/11♭9♯13'}],
    'm6/♭9♭11': [{label: '♭13', alt: 'm6/♭9♭11♭13', value: '6/♭9♭11♭13'}, {label: '♯13', alt: 'm6/♭9♭11♯13', value: '6/♭9♭11♯13'}],
    'm6/♭9♯11': [{label: '♭13', alt: 'm6/♭9♯11♭13', value: '6/♭9♯11♭13'}, {label: '♯13', alt: 'm6/♭9♯11♯13', value: '6/♭9♯11♯13'}],
    '11♭5': [{label: '♭13', alt: '11♭5♭13', value: '11♭5♭13'}, {label: '♯13', alt: '11♭5♯13', value: '11♭5♯13'}],
    '9♭5♭11': [{label: '♭13', alt: '9♭5♭11♭13', value: '9♭5♭11♭13'}, {label: '♯13', alt: '9♭5♭11♯13', value: '9♭5♭11♯13'}],
    '11♭5♭9': [{label: '♭13', alt: '11♭5♭9♭13', value: '11♭5♭9♭13'}, {label: '♯13', alt: '11♭5♭9♯13', value: '11♭5♭9♯13'}],
    '7♭5♭9♭11': [{label: '♭13', alt: '7♭5♭9♭11♭13', value: '7♭5♭9♭11♭13'}, {label: '♯13', alt: '7♭5♭9♭11♯13', value: '7♭5♭9♭11♯13'}],
    '°11♭5': [{label: '♭13', alt: '°11♭5♭13', value: '°11♭5♭13'}, {label: '♯13', alt: '°11♭5♯13', value: '°11♭5♯13'}],
    '°9♭5♭11': [{label: '♭13', alt: '°9♭5♭11♭13', value: '°9♭5♭11♭13'}, {label: '♯13', alt: '°9♭5♭11♯13', value: '°9♭5♭11♯13'}],
    '°11♭5♭9': [{label: '♭13', alt: '°11♭5♭9♭13', value: '°11♭5♭9♭13'}, {label: '♯13', alt: '°11♭5♭9♯13', value: '°11♭5♭9♯13'}],
    '°7♭5♭9♭11': [{label: '♭13', alt: '°7♭5♭9♭11♭13', value: '°7♭5♭9♭11♭13'}, {label: '♯13', alt: '°7♭5♭9♭11♯13', value: '°7♭5♭9♭11♯13'}],
    '11♯5': [{label: '13', alt: '13♯5', value: '13♯5'}],
    '9♯5♯11': [{label: '13', alt: '13♯5♯11', value: '13♯5♯11'}],
    '11♯5♭9': [{label: '13', alt: '13♯5♭9', value: '13♯5♭9'}],
    '7♯5♭9♯11': [{label: '13', alt: '13♯5♭9♯11', value: '13♯5♭9♯11'}],
    '11♯5♯9': [{label: '13', alt: '13♯5♯9', value: '13♯5♯9'}],
    '7♯5♯9♯11': [{label: '13', alt: '13♯5♯9♯11', value: '13♯5♯9♯11'}],
    'M11♯5': [{label: '13', alt: 'M13♯5', value: 'M13♯5'}, {label: '♯13', alt: 'M11♯5♯13', value: 'M11♯5♯13'}],
    'M9♯5♯11': [{label: '13', alt: 'M13♯5♯11', value: 'M13♯5♯11'}, {label: '♯13', alt: 'M♯13♯5♯11', value: 'M♯13♯5♯11'}],
    'M11♯5♭9': [{label: '13', alt: 'M13♯5♭9', value: 'M13♯5♭9'}, {label: '♯13', alt: 'M11♯5♭9♯13', value: 'M11♯5♭9♯13'}],
    'M7♯5♭9♯11': [{label: '13', alt: 'M13♯5♭9♯11', value: 'M13♯5♭9♯11'}, {label: '♯13', alt: 'M7♯5♭9♯11♯13', value: 'M7♯5♭9♯11♯13'}],
    'M11♯5♯9': [{label: '13', alt: 'M13♯5♯9', value: 'M13♯5♯9'}, {label: '♯13', alt: 'M11♯5♯9♯13', value: 'M11♯5♯9♯13'}],
    'M7♯5♯9♯11': [{label: '13', alt: 'M13♯5♯9♯11', value: 'M13♯5♯9♯11'}, {label: '♯13', alt: 'M7♯5♯9♯11♯13', value: 'M7♯5♯9♯11♯13'}],
    '9♭11sus4': [{label: '13', alt: '13♭11sus4', value: '13♭11sus4'}, {label: '♭13', alt: '9♭11♭13sus4', value: '9♭11♭13sus4'}],
    '9♯11sus4': [{label: '13', alt: '13♯11sus4', value: '13♯11sus4'}, {label: '♭13', alt: '9♯11♭13sus4', value: '9♯11♭13sus4'}],
    '7♭9♭11sus4': [{label: '13', alt: '13♭9♭11sus4', value: '13♭9♭11sus4'}, {label: '♭13', alt: '7♭9♭11♭13sus4', value: '7♭9♭11♭13sus4'}],
    '7♭9♯11sus4': [{label: '13', alt: '13♭9♯11sus4', value: '13♭9♯11sus4'}, {label: '♭13', alt: '7♭9♯11♭13sus4', value: '7♭9♯11♭13sus4'}],
    '7♯9♭11sus4': [{label: '13', alt: '13♯9♭11sus4', value: '13♯9♭11sus4'}, {label: '♭13', alt: '7♯9♭11♭13sus4', value: '7♯9♭11♭13sus4'}],
    '7♯9♯11sus4': [{label: '13', alt: '13♯9♯11sus4', value: '13♯9♯11sus4'}, {label: '♭13', alt: '7♯9♯11♭13sus4', value: '7♯9♯11♭13sus4'}],
    '11♭9sus2': [{label: '13', alt: '13♭9sus2', value: '13♭9sus2'}, {label: '♭13', alt: '11♭9♭13sus2', value: '11♭9♭13sus2'}],
    '7♭9♭11sus2': [{label: '13', alt: '13♭9♭11sus2', value: '13♭9♭11sus2'}, {label: '♭13', alt: '7♭9♭11♭13sus2', value: '7♭9♭11♭13sus2'}],
    '7♭9♯11sus2': [{label: '13', alt: '13♭9♯11sus2', value: '13♭9♯11sus2'}, {label: '♭13', alt: '7♭9♯11♭13sus2', value: '7♭9♯11♭13sus2'}],
    '11♯9sus2': [{label: '13', alt: '13♯9sus2', value: '13♯9sus2'}, {label: '♭13', alt: '11♯9♭13sus2', value: '11♯9♭13sus2'}],
    '7♯9♭11sus2': [{label: '13', alt: '13♯9♭11sus2', value: '13♯9♭11sus2'}, {label: '♭13', alt: '7♯9♭11♭13sus2', value: '7♯9♭11♭13sus2'}],
    '7♯9♯11sus2': [{label: '13', alt: '13♯9♯11sus2', value: '13♯9♯11sus2'}, {label: '♭13', alt: '7♯9♯11♭13sus2', value: '7♯9♯11♭13sus2'}],
}

const inversionTypes: { [key: string]: ChordType } = {
    // Triads
    '/2': {label: '/2', alt: '/2', value: '/2'},
    '/3': {label: '/3', alt: '/3', value: '/3'},
    '/4': {label: '/4', alt: '/4', value: '/4'},
    '/5': {label: '/5', alt: '/5', value: '/5'},

    // Sevenths
    '/7': {label: '/7', alt: '/7', value: '/7'},
    '/6': {label: '/6', alt: '/6', value: '/6'},

    // Ninths
    '/9': {label: '/9', alt: '/9', value: '/9'},

    // Elevenths
    '/11': {label: '/11', alt: '/11', value: '/11'},

    // Thirteenths
    '/13': {label: '/13', alt: '/13', value: '/13'},
};

const keyChangeTypes = {
    '–': [
        'K–m2',
        'K–M2',
        'K–m3',
        'K–M3',
        'K–P4',
        'K–TT',
        'K–P5',
        'K–m6',
        'K–M6',
        'K–m7',
        'K–M7',
    ],
    '+': [
        'K+m2',
        'K+M2',
        'K+m3',
        'K+M3',
        'K+P4',
        'K+TT',
        'K+P5',
        'K+m6',
        'K+M6',
        'K+m7',
        'K+M7',
    ],
}

function ChordKeyboard({ originalChords, onChordComplete }: { originalChords: string[], onChordComplete: (chord: string) => void }) {
    const darkMode = useTheme();

    const [chords, setChords] = useState<string[]>(originalChords);
    
    const [flat, setFlat] = useState<boolean>(false);
    const [sharp, setSharp] = useState<boolean>(false);

    const [selectedRomanNumeral, setSelectedRomanNumeral] = useState<RomanNumeral | null>(null);
    const [selectedTriad, setSelectedTriad] = useState<ChordType | null>(null);
    const [selectedSeventh, setSelectedSeventh] = useState<ChordType | null>(null);
    const [selectedNinth, setSelectedNinth] = useState<ChordType | null>(null);
    const [selectedEleventh, setSelectedEleventh] = useState<ChordType | null>(null);
    const [selectedThirteenth, setSelectedThirteenth] = useState<ChordType | null>(null);
    const [selectedInversion, setSelectedInversion] = useState<ChordType | null>(null);

    const [allInversions, setAllInversions] = useState<ChordType[] | null>(null);

    const handleRomanNumeralPress = (numeral: RomanNumeral) => {
        setSelectedRomanNumeral(numeral);
        setSelectedTriad(null);
        setSelectedSeventh(null);
        setSelectedNinth(null);
        setSelectedEleventh(null);
        setSelectedThirteenth(null);
        setAllInversions(null);
        setSelectedInversion(null);
    };

    const handleTriadPress = (triad: ChordType) => {
        setSelectedTriad(triad);
        setSelectedSeventh(triad);
        setSelectedNinth(triad);
        setSelectedEleventh(triad);
        setSelectedThirteenth(triad);
        setAllInversions(null);
        setSelectedInversion(null);
    }

    const handleSeventhPress = (seventh: ChordType) => {
        setSelectedSeventh(seventh);
        setSelectedNinth(seventh);
        setSelectedEleventh(seventh);
        setSelectedThirteenth(seventh);
        setAllInversions(null);
        setSelectedInversion(null);
    }

    const handleNinthPress = (ninth: ChordType) => {
        setSelectedNinth(ninth);
        setSelectedEleventh(ninth);
        setSelectedThirteenth(ninth);
        setAllInversions(null);
        setSelectedInversion(null);
    }

    const handleEleventhPress = (eleventh: ChordType) => {
        setSelectedEleventh(eleventh);
        setSelectedThirteenth(eleventh);
        setAllInversions(null);
        setSelectedInversion(null);
    }

    const handleThirteenthPress = (thirteenth: ChordType) => {
        setSelectedThirteenth(thirteenth);
        setAllInversions(null);
        setSelectedInversion(null);
    }

    const handleLeftParenthesisPress = () => {
        if (chords[chords.length - 1] !== '(') { // prevent multiple parentheses or parentheses at beginning
            setChords(chords => [...chords, '(']);
        }
    }

    const handleRightParenthesisPress = () => {
        if (chords.length > 0 && // prevent right parentheses at beginning
            chords[chords.length - 1] !== ')' &&  // prevent multiple right parentheses
            chords[chords.length - 1] !== ' ' && // prevent right parentheses after space
            chords[chords.length - 1] !== '(') { // prevent right parentheses after left parentheses
            setChords(chords => [...chords, ')']);
        }
    }

    const handleKeyChangeDownPress = () => {
        if (chords.length > 0) {
            if (chords[chords.length - 1] === ' ' && chords[chords.length - 2].includes('K')) { // cycle through key changes
                const keyChange = chords[chords.length - 2].split('K–');
                const key = keyChange[1];
                const keyIndex = keyChangeTypes['–'].indexOf('K–' + key);
                const newKey = keyChangeTypes['–'][(keyIndex + 1) % keyChangeTypes['–'].length];
                setChords(chords => [...chords.slice(0, -2), newKey, ' ']);
            } else if (chords[chords.length - 1] === ' ') { // add key change after space
                setChords(chords => [...chords, 'K–m2', ' ']);
            } else if (chords[chords.length - 1] !== '(') { // add key change after chord
                setChords(chords => [...chords, ' ', 'K–m2', ' ']);
            }
        }
    }

    const handleKeyChangeUpPress = () => {
        if (chords.length > 0) {
            if (chords[chords.length - 1] === ' ' && chords[chords.length - 2].includes('K')) { // cycle through key changes
                const keyChange = chords[chords.length - 2].split('K+');
                const key = keyChange[1];
                const keyIndex = keyChangeTypes['+'].indexOf('K+' + key);
                const newKey = keyChangeTypes['+'][(keyIndex + 1) % keyChangeTypes['+'].length];
                setChords(chords => [...chords.slice(0, -2), newKey, ' ']);
            } else if (chords[chords.length - 1] === ' ') { // add key change after space
                setChords(chords => [...chords, 'K+m2', ' ']);
            } else if (chords[chords.length - 1] !== '(') { // add key change after chord
                setChords(chords => [...chords, ' ', 'K+m2', ' ']);
            }
        }
    }

    const handleFlatPress = () => {
            setFlat(flat => !flat);
            setSharp(false);
    }

    const handleSharpPress = () => {
            setSharp(sharp => !sharp);
            setFlat(false);
    }

    const handleRepeatPress = () => {
        if (chords.length > 0) {
            if (chords[chords.length - 1] === ' ' && chords[chords.length - 2].includes(':')) { // increment repeat bar
                const repeatBar = chords[chords.length - 2].split(':');
                const repeatCount = parseInt(repeatBar[1]) + 1;
                setChords(chords => [...chords.slice(0, -2), `:${repeatCount}`, ' ']);
            } else if (chords[chords.length - 1] === ' ') { // add repeat bar after space
                setChords(chords => [...chords, ':1', ' ']);
            } else if (chords[chords.length - 1] !== '(') { // add repeat bar after chord
                setChords(chords => [...chords, ' ', ':1', ' ']);
            }
        }
    }

    const handleInversionPress = () => {
        const inversions: ChordType[] = [];

        if (selectedRomanNumeral && selectedTriad) {
            if (selectedTriad.label === 'M' || 
                selectedTriad.label === 'm' || 
                selectedTriad.label === '°' || 
                selectedTriad.label === '+') { // '/3' and '/5' inversions

                inversions.push(inversionTypes['/3']);
                inversions.push(inversionTypes['/5']);
            } else if (selectedTriad.label === 'sus4') { // '/4' and '/5' inversions
                inversions.push(inversionTypes['/4']);
                inversions.push(inversionTypes['/5']);
            } else if (selectedTriad.label === 'sus2') { // '/2' and '/5' inversions
                inversions.push(inversionTypes['/2']);
                inversions.push(inversionTypes['/5']);
            } else if (selectedTriad.label === '5') { // '/5' inversion
                inversions.push(inversionTypes['/5']);
            } else if  (selectedTriad.label === 'no5') { // '/3' inversion
                inversions.push(inversionTypes['/3']);
            }

            if (selectedTriad !== selectedSeventh) { // seventh chords
                if (selectedSeventh?.label === '6') {
                    inversions.push(inversionTypes['/6']);
                } else {
                    inversions.push(inversionTypes['/7']);
                }
            }

            if (selectedSeventh === selectedNinth && 
                selectedNinth === selectedEleventh &&
                selectedEleventh === selectedThirteenth) {
                
                // do nothing
            } else if (selectedNinth === selectedEleventh &&
                selectedEleventh === selectedThirteenth) { // ninth chords
                
                inversions.push(inversionTypes['/9']);
            } else if (selectedEleventh === selectedThirteenth) { // eleventh chords
                
                if (selectedEleventh?.label === 'add11') {
                    inversions.push(inversionTypes['/11']);
                } else {
                    inversions.push(inversionTypes['/9']);
                    inversions.push(inversionTypes['/11']);
                }
            } else if (selectedThirteenth) { // thirteenth chords
                
                if (selectedThirteenth.label === 'add13') {
                    inversions.push(inversionTypes['/13']);
                } else {
                    inversions.push(inversionTypes['/9']);
                    inversions.push(inversionTypes['/11']);
                    inversions.push(inversionTypes['/13']);
                }
            }
        }

        setAllInversions(inversions);
    }

    const handleInversionSelect = (inversion: ChordType) => {
        setSelectedInversion(inversion);
    }

    const handleErasePress = () => {
        if (chords[chords.length - 1] === ' ' && chords[chords.length - 2].includes(':')) { // erase repeat bar and spaces around it
            setChords(chords => chords.slice(0, -3));
        } else if (chords[chords.length - 1] === ' ' && chords[chords.length - 2].includes('K')) { // erase key change and space
            setChords(chords => chords.slice(0, -3));

        } else { // erase last character
            setChords(chords => chords.slice(0, -1));
        }
    }

    const handleSpacePress = () => {
        if (chords.length > 0 && chords[chords.length - 1] !== ' ' && chords[chords.length - 1] !== '(') { // prevent multiple spaces or space at beginning
            setChords(chords => [...chords, ' ']);
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

            if (selectedInversion) { // add inversion
                completeChord += selectedInversion.value;
            }

            setChords(chords => [...chords, completeChord]);

            setFlat(false);
            setSharp(false);

            setSelectedRomanNumeral(null);
            setSelectedTriad(null);
            setSelectedSeventh(null);
            setSelectedNinth(null);
            setSelectedEleventh(null);
            setSelectedThirteenth(null);
            setAllInversions(null);
            setSelectedInversion(null);
        }
    }

    useEffect(() => { // update section chords when selected chords change (changes textbox value)
        onChordComplete(chords.join('-').replace(/-\s-|-\s|\(-|-\)/g, match => {
            if (match === '- -') return ' '; // hide dash before and after space
            if (match === '- ') return ' '; // hide dash before space
            if (match === '(-') return '('; // hide dash after left parenthesis
            if (match === '-)') return ')'; // hide dash before right parenthesis

            return '';
        }));
    }, [chords]);

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 5 }}>
                <View style={{flexDirection: 'row', gap: 10 }}>
                    <Button 
                        title='♭'
                        color={flat ? '#009788' : undefined}
                        onPress={handleFlatPress}
                    />
                    <Button 
                        title='♯'
                        color={sharp ? '#009788' : undefined}
                        onPress={handleSharpPress}
                    /> 
                </View>
                <View style={{flexDirection: 'row', gap: 10 }}>
                    <Button 
                        title='('
                        onPress={handleLeftParenthesisPress}
                    />
                    <Button 
                        title=')'
                        onPress={handleRightParenthesisPress}
                    /> 
                </View>
                <View style={{flexDirection: 'row', gap: 10 }}>
                    <Button 
                        title='↓'
                        onPress={handleKeyChangeDownPress}
                    />
                    <Button 
                        title='↑'
                        onPress={handleKeyChangeUpPress}
                    /> 
                </View>
                <View style={{flexDirection: 'row', gap: 10 }}>
                    <Button 
                        title=':|'
                        onPress={handleRepeatPress}
                    />
                </View>
                <View style={{flexDirection: 'row', gap: 10 }}>
                    <Button 
                        title='Inv'
                        onPress={handleInversionPress}
                    />
                </View>
                <View style={{flexDirection: 'row', gap: 10 }}>
                    <Button 
                        title='/'
                    />
                </View>
            </View>
            <ScrollView horizontal style={styles.container}>
                <View style={styles.column}>
                    <ScrollView>
                        {romanNumerals.map((numeral) => (
                        <RomanNumeralButton
                            key={numeral}
                            numeral={numeral}
                            selected={selectedRomanNumeral === numeral}
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
                            selected={selectedTriad === triad}
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
                            selected={selectedSeventh === seventh}
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
                            selected={selectedNinth === ninth}
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
                            selected={selectedEleventh === eleventh}
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
                            selected={selectedThirteenth === thirteenth}
                            onPress={handleThirteenthPress}
                        />
                        ))}
                    </ScrollView>
                </View>
                <View style={styles.column}>
                    <ScrollView>
                        {allInversions && allInversions.map((inversion, index) => (
                            <ChordTypeButton
                                key={index}
                                chordType={inversion}
                                selected={selectedInversion === inversion}
                                onPress={() => handleInversionSelect(inversion)}
                            />
                            ))}
                    </ScrollView>
                </View>
            </ScrollView>
            <View style={{ position: 'absolute', right: 25, bottom: 10, flexDirection: 'column', gap: 10 }}>
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
        // justifyContent: 'center',
    },
    column: {
        flexDirection: 'column',
    },
});

export default ChordKeyboard;