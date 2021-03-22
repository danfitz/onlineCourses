import React from 'react';
import { View, FlatList, Text } from 'react-native';
import ImageDetail from '../components/ImageDetail';

const ImageScreen = () => {
  const cards = [
    {
      title: 'Forest',
      // imageUrl:
      //   'https://images.unsplash.com/photo-1609400816977-ed9aa6240433?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=300',
      imageSource: require('../../assets/forest.jpg'),
      score: 9,
    },
    {
      title: 'Mountain',
      // imageUrl:
      // 'https://images.unsplash.com/photo-1611052684195-db42dd1baf20?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=300',
      imageSource: require('../../assets/mountain.jpg'),
      score: 7,
    },
    {
      title: 'Beach',
      // imageUrl:
      // 'https://images.unsplash.com/photo-1609552540978-08b06b39618c?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=300&ixlib=rb-1.2.1&q=80&w=300',
      imageSource: require('../../assets/beach.jpg'),
      score: 4,
    },
  ];

  return (
    <View>
      <FlatList
        keyExtractor={card => card.title}
        data={cards}
        renderItem={({ item }) => <ImageDetail {...item} />}
      />
    </View>
  );
};

export default ImageScreen;
