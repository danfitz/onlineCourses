import React, { useContext } from 'react';
import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import R from 'ramda';
import { Context as BlogContext } from '../context/BlogContext';

const IndexScreen = ({ navigation: { navigate } }) => {
  const { state, deleteBlogPost } = useContext(BlogContext);

  const renderPost = R.compose(
    item => (
      <TouchableOpacity onPress={() => navigate('Show', { id: item.id })}>
        <View style={styles.row}>
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
            <Feather name='trash' style={styles.trash} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    ),
    R.prop('item')
  );

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={R.prop('title')}
        renderItem={renderPost}
      />
    </View>
  );
};

IndexScreen.navigationOptions = ({ navigation: { navigate } }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigate('Create')}>
      <Feather name='plus' size={30} />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  title: {
    fontSize: 18,
  },
  trash: {
    fontSize: 24,
  },
});

export default IndexScreen;
