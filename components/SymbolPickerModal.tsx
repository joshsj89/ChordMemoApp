import { Button, Modal, Text, TouchableOpacity, View } from "react-native";
import { useTheme } from "./ThemeContext";

function SymbolPickerModal({ isVisible, onClose, onSelect }) {
    const symbols = ['♭', '♯'];

    const darkMode = useTheme();

    const handleSymbolSelect = (symbol) => {
        onSelect(symbol);
        onClose();
    }

    return (
        <Modal
            visible={isVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ backgroundColor: !darkMode ? 'white' : 'black', padding: 20, gap: 20, borderRadius: 10, borderWidth: !darkMode ? 0 : 1, borderColor: !darkMode ? 'white' : '#444' }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', color: !darkMode ? 'black' : 'white' }}>Select a symbol</Text>
                    <View style={{ flexDirection: 'row', gap: 20, justifyContent: 'center' }}>
                        {symbols.map((symbol, index) => (
                            <TouchableOpacity 
                                key={index} 
                                onPress={() => handleSymbolSelect(symbol)}
                                style={{ padding: 10, borderWidth: 1, borderRadius: 10, borderColor: !darkMode ? 'black' : 'white' }}
                            >
                                <Text style={{ fontSize: 24, color: !darkMode ? 'black' : 'white' }}>{symbol}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Button onPress={onClose} style={{ alignItems: 'center' }}
                        title="Close"
                        color="#009788"
                    />
                </View>
            </View>
        </Modal>
    );
}

export default SymbolPickerModal;