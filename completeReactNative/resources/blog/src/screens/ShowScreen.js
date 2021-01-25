import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import R from 'ramda';
import { Context as BlogContext } from '../context/BlogContext';

const ShowScreen = ({ navigation: { getParam } }) => {
  const { state } = useContext(BlogContext);
  const post = state.find(R.propEq('id', getParam('id')));
  console.log(post);

  return (
    <View>
      <Text>{post.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ShowScreen;
