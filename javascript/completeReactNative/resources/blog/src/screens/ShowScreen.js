import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import R from 'ramda';
import { Context as BlogContext } from '../context/BlogContext';
import { EvilIcons } from '@expo/vector-icons';

const ShowScreen = ({ navigation: { getParam } }) => {
  const { state } = useContext(BlogContext);
  const post = state.find(R.propEq('id', getParam('id')));

  return (
    <View>
      <Text>{post.title}</Text>
      <Text>{post.content}</Text>
    </View>
  );
};

ShowScreen.navigationOptions = ({ navigation: { navigate, getParam } }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigate('Edit', { id: getParam('id') })}>
      <EvilIcons name='pencil' size={35} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({});

export default ShowScreen;
