import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import R from 'ramda';

const renderRestaurantTitle = R.compose(
  name => <Text>{name}</Text>,
  R.prop('name'),
  R.prop('item')
);

const RestaurantsList = ({ title, restaurants }) => (
  <View>
    <Text style={styles.title}>{title}</Text>
    <FlatList
      data={restaurants}
      keyExtractor={R.prop('id')}
      renderItem={renderRestaurantTitle}
      horizontal
    />
  </View>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RestaurantsList;
