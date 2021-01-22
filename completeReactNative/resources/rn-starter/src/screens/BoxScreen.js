import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const BoxScreen = () => {
  return (
    <View style={styles.view}>
      <View style={styles.viewOne} />
      <View style={styles.viewTwo} />
      <View style={styles.viewThree} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 15,
    padding: 15,
    borderColor: 'red',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewOne: {
    backgroundColor: 'red',
    height: 100,
    width: 100,
  },
  viewTwo: {
    backgroundColor: 'green',
    height: 100,
    width: 100,
    top: 100,
  },
  viewThree: {
    backgroundColor: 'blue',
    height: 100,
    width: 100,
  },
});

export default BoxScreen;
