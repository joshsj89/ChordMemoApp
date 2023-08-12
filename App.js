import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    const addNote = async () => {
        if (newNote) {
            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            setNewNote('');

            try {
                await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes)); // notes is the key, updatedNotes is the value
            } catch (err) {
                console.error('Error saving notes:', err);
            }
        }
    };

    useEffect(() => {
        const loadNotes = async () => {
            try {
                const savedNotes = await AsyncStorage.getItem('notes');
                if (savedNotes) {
                    setNotes(JSON.parse(savedNotes));
                }
            } catch (err) {
                console.error('Error loading notes:', err);
            }
        }

        loadNotes();
    }, []);

    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text style={{ fontSize: 24, marginBottom: 20, textAlign: 'center' }}>ChordMemo</Text>
            <TextInput
                style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10 }}
                placeholder="Enter a new note"
                value={newNote}
                onChangeText={setNewNote}
            />
            <Button title="Add Note" onPress={addNote} />
            <FlatList
                data={notes}
                renderItem={({ item }) => <Text style={{ marginTop: 10 }}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    );
}