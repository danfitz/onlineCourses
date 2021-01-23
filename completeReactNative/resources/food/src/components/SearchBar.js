import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onTermChange, onTermSubmit }) => (
  <View style={styles.background}>
    <Feather name='search' style={styles.icon} />
    <TextInput
      style={styles.input}
      placeholder='Search'
      autoCapitalize='none'
      autoCorrect={false}
      value={term}
      onChangeText={onTermChange}
      onEndEditing={onTermSubmit}
    />
  </View>
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#F0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    marginTop: 15,
    paddingLeft: 10,
    flexDirection: 'row',
  },
  icon: {
    fontSize: 35,
    alignSelf: 'center',
  },
  input: {
    fontSize: 18,
    flex: 1,
    padding: 10,
  },
});

export default SearchBar;
