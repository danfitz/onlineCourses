import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InputScreen = () => {
  return (
    <View>
      <Text>Box Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  input: { margin: 15, padding: 15, borderColor: 'black', borderWidth: 1 },
  error: { color: 'red' },
});

export default InputScreen;
