import { View, Text, StyleSheet } from 'react-native';

function MainScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Main Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default MainScreen;