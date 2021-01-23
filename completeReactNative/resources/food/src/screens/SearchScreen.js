import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import R from 'ramda';
import SearchBar from '../components/SearchBar';
import RestaurantsList from '../components/RestaurantsList';
import useRestaurants from '../hooks/useRestaurants';

const DEFAULT_TERM = 'food';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [restaurants, getRestaurants, failed] = useRestaurants(DEFAULT_TERM);

  const filterRestaurantsByPrice = targetPrice =>
    restaurants.filter(R.compose(R.equals(targetPrice), R.prop('price')));

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => getRestaurants(term)}
      />
      {failed ? (
        <Text style={{ color: 'red' }}>Unable to fetch restaurants</Text>
      ) : (
        <>
          <Text>We have found {restaurants.length} restaurants</Text>
          <RestaurantsList
            title='Cost Effective'
            restaurants={filterRestaurantsByPrice('$')}
          />
          <RestaurantsList
            title='Bit Pricier'
            restaurants={filterRestaurantsByPrice('$$')}
          />
          <RestaurantsList
            title='Big Spender!'
            restaurants={filterRestaurantsByPrice('$$$')}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
