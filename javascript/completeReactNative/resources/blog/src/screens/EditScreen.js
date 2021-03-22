import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import R from 'ramda';
import { Context as BlogContext } from '../context/BlogContext';
import BlogPostForm from '../components/BlogPostForm';

const EditScreen = ({ navigation: { getParam, pop } }) => {
  const { state, editBlogPost } = useContext(BlogContext);
  const id = getParam('id');
  const post = state.find(R.propEq('id', id));

  return (
    <View>
      <BlogPostForm
        initialValues={post}
        onSubmit={editBlogPost(id, R.__, R.__, pop)}
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

export default EditScreen;
