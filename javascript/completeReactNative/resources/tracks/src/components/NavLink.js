import React from 'react';
import { withNavigation } from 'react-navigation';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-elements';
import Spacer from './Spacer';

const NavLink = ({ text, goTo, navigation }) => (
  <TouchableOpacity onPress={() => navigation.navigate(goTo)}>
    <Spacer>
      <Text style={styles.link}>{text}</Text>
    </Spacer>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  link: {
    color: 'blue',
  },
});

export default withNavigation(NavLink);
