import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const InputScreen = () => {
  const [name, setName] = useState('');
  return (
    <View>
      <Text>Enter password:</Text>
      <TextInput
        style={styles.input}
        autoCapitalize='none'
        autoCorrect={false}
        value={name}
        onChangeText={setName}
      />
      {name.length <= 5 && (
        <Text style={styles.error}>
          Password must be longer than 5 characters
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: { margin: 15, padding: 15, borderColor: 'black', borderWidth: 1 },
  error: { color: 'red' },
});

export default InputScreen;
