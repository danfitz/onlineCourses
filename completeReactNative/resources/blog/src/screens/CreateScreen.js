import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { Context as BlogContext } from '../context/BlogContext';

const CreateScreen = ({ navigation: { navigate } }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { state, addBlogPost } = useContext(BlogContext);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
      />
      <Button
        title='Add Blog Post'
        onPress={() => addBlogPost(title, content, () => navigate('Index'))}
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
