import AsyncStorage from "@react-native-async-storage/async-storage";

const saveDarkModePreference = async (enabled) => {
    try {
        await AsyncStorage.setItem('darkMode', JSON.stringify(enabled));
    } catch (error) {
        console.error('Error saving dark mode preference:', error);
    }
}

const loadDarkModePreference = async () => {
    try {
        const enabled = await AsyncStorage.getItem('darkMode');
        return enabled != null ? JSON.parse(enabled) : false;
    } catch (error) {
        console.error('Error loading dark mode preference:', error);
        return false;
    }
}

export { saveDarkModePreference, loadDarkModePreference };