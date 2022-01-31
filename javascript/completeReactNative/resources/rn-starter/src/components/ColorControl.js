import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';

const ColorControl = ({ colorName, onIncrease, onDecrease }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={styles.title}>{colorName}</Text>
    <Button title={`More ${colorName}`} onPress={() => onIncrease(colorName)} />
    <Button title={`Less ${colorName}`} onPress={() => onDecrease(colorName)} />
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});

export default ColorControl;
