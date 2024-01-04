interface GenreOption {
    label: string;
    value: string;
}

interface Key {
    tonic: string;
    symbol: string;
    mode: string;
}

interface Section {
    sectionTitle: string;
    key: Key;
    chords: string;
}

interface Section2 {
    sectionTitle: string;
    key: string;
    chords: string;
}

interface Song {
    id: string;
    title: string;
    artist: string;
    genres: string[];
    sections: Section[];
}