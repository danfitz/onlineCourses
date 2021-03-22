import React from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';

const ComponentsScreen = () => {
  const myName = 'Dan';
  return <View style={styles.view}>
    <Text style={styles.headingStyle}>Getting started with React Native!</Text>
    <Text style={styles.subheadingStyle}>My name is {myName}</Text>
    <Button title='Click Me'/>
  </View>
}

const styles = StyleSheet.create({
  view: {backgroundColor: 'pink', height: '100%'},
  headingStyle: {fontSize: 45, textAlign: 'center', paddingVertical: 50},
  subheadingStyle: {fontSize: 20, textAlign: 'center'},
});

export default ComponentsScreen;
