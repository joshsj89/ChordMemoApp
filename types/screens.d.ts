import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    Home: undefined;
    SearchResults: { query: string };
    About: undefined;
    SongDetails: { song: Song };
    AddSong: undefined;
    EditSong: { song: Song };
    ExportImport: undefined;
}

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type SearchResultsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SearchResults'>;
type AboutScreenNavigationProp = StackNavigationProp<RootStackParamList, 'About'>;
type SongDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SongDetails'>;
type AddSongScreenNavigationProp = StackNavigationProp<RootStackParamList, 'AddSong'>;
type EditSongScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditSong'>;
type ExportImportScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ExportImport'>;