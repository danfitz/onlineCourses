import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import R from 'ramda';
import RestaurantCard from './RestaurantCard';

const RestaurantsList = ({ title, restaurants, navigation: { navigate } }) => {
  const renderRestaurant = R.compose(
    item => (
      <TouchableOpacity onPress={() => navigate('Details', { id: item.id })}>
        <RestaurantCard {...item} />
      </TouchableOpacity>
    ),
    R.prop('item')
  );

  if (!restaurants.length) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={restaurants}
        keyExtractor={R.prop('id')}
        renderItem={renderRestaurant}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: { marginBottom: 10 },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default withNavigation(RestaurantsList);
