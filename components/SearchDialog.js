import { useState } from 'react';
import { TextInput } from 'react-native';
import { Button } from 'react-native';
import { Modal, Text, View } from 'react-native';
import RadioButtonsGroup from 'react-native-radio-buttons-group';
import { useTheme } from './ThemeContext';

const radioButtonsData = [
    {
        id: '1',
        label: 'Title',
        value: 'title',
    },
    {
        id: '2',
        label: 'Artist',
        value: 'artist',
    },
    {
        id: '3',
        label: 'Genre',
        value: 'genre',
    },
    {
        id: '4',
        label: 'Key',
        value: 'key',
    },
    {
        id: '5',
        label: 'Chords',
        value: 'chords',
    }
]

const radioButtonsDataDark = [
    {
        id: '1',
        label: 'Title',
        value: 'title',
        color: 'white',
        labelStyle: { color: 'white' }
    },
    {
        id: '2',
        label: 'Artist',
        value: 'artist',
        color: 'white',
        labelStyle: { color: 'white' }
    },
    {
        id: '3',
        label: 'Genre',
        value: 'genre',
        color: 'white',
        labelStyle: { color: 'white' }
    },
    {
        id: '4',
        label: 'Key',
        value: 'key',
        color: 'white',
        labelStyle: { color: 'white' }
    },
    {
        id: '5',
        label: 'Chords',
        value: 'chords',
        color: 'white',
        labelStyle: { color: 'white' }
    }
]

function SearchDialog({ isVisible, onClose, onSearch }) {
    const [searchText, setSearchText] = useState('');
    const [searchOptions, setSearchOptions] = useState('title');
    const [selectedRadioButton, setSelectedRadioButton] = useState('1');

    const darkMode = useTheme();

    const handleSearch = () => {
        onSearch(searchText.trim(), searchOptions);
        setSearchText('');
    }

    return (
        <Modal visible={isVisible} transparent={true} animationType='slide' onRequestClose={onClose}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', gap: 30 }}>
                <View style={{ backgroundColor: !darkMode ? 'white' : 'black', padding: 20, borderRadius: 10, width: '80%', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: !darkMode ? 'black' : 'white' }}>Search</Text>
                    <TextInput 
                        placeholder='Enter search text'
                        placeholderTextColor='gray'
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                        style={{ width: '100%', height: 40, borderColor: !darkMode ? 'gray' : 'white', borderWidth: 1, borderRadius: 5, padding: 5, marginVertical: 10, color: !darkMode ? 'black' : 'white' }}
                    />
                    <RadioButtonsGroup
                        layout='row'
                        containerStyle={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }} 
                        radioButtons={!darkMode ? radioButtonsData : radioButtonsDataDark}
                        onPress={(selectedId) => {
                            setSelectedRadioButton(selectedId);
                            setSearchOptions(radioButtonsData.find(radioButton => radioButton.id === selectedId).value);
                        }}
                        selectedId={selectedRadioButton}
                    />
                    <View style={{ flexDirection: 'row', gap: 10, marginTop: 10 }}>
                        <Button title="Close" onPress={onClose} color="#009788" />
                        <Button title="Search" onPress={handleSearch} color="#009788" />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default SearchDialog;