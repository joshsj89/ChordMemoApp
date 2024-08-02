type Triad = ('M' | 'm' | '°' | '+' | 'sus4' | 'sus2' | '5' | 'no5');

type ThirteenthChords = ('13' | '♭13' | '♯13');
type EleventhChords = ('11' | '♭11' | '♯11');
type NinthChords = ('9' | '♭9' | '♯9');

type RomanNumeral = ('I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII');
type ChordType = { label: string, alt: string, value: string };
type ExtendedChordTypes = { [key: string]: ChordType[] };