import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import R from 'ramda';
import SearchBar from '../components/SearchBar';
import RestaurantsList from '../components/RestaurantsList';
import useRestaurants from '../hooks/useRestaurants';

const DEFAULT_TERM = 'food';

const SearchScreen = ({ navigation: { navigate } }) => {
  const [term, setTerm] = useState('');
  const [restaurants, getRestaurants, failed] = useRestaurants(DEFAULT_TERM);

  const filterRestaurantsByPrice = targetPrice =>
    restaurants.filter(R.compose(R.equals(targetPrice), R.prop('price')));

  return (
    <>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={() => getRestaurants(term)}
      />
      {failed ? (
        <Text style={{ color: 'red' }}>Unable to fetch restaurants</Text>
      ) : (
        <ScrollView>
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
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
