import React, { useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import R from 'ramda';
import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const CreateScreen = ({ navigation: { navigate } }) => {
  const { addBlogPost } = useContext(BlogContext);

  return (
    <View style={styles.container}>
      <BlogPostForm
        onSubmit={addBlogPost(R.__, R.__, () => navigate('Index'))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 10 },
  label: { fontSize: 20, marginBottom: 5 },
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
    padding: 5,
    marginBottom: 15,
  },
});

export default CreateScreen;
