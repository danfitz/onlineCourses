import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import R from 'ramda';
import yelp from '../api/yelp';

const renderImage = R.compose(
  item => <Image style={styles.image} source={{ uri: item }} />,
  R.prop('item')
);

const DetailsScreen = ({ navigation: { getParam } }) => {
  const [details, setDetails] = useState(null);

  const getDetails = async id => {
    try {
      const { data } = await yelp.get(`/${id}`);
      setDetails(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const id = getParam('id');
    getDetails(id);
  }, []);

  if (!details) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{details.name}</Text>
      <FlatList
        data={details.photos}
        keyExtractor={R.identity}
        renderItem={renderImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { margin: 15, alignItems: 'center' },
  name: { fontSize: 22, fontWeight: 'bold', marginBottom: 30, marginTop: 15 },
  image: { height: 200, width: 300, marginBottom: 15 },
});

export default DetailsScreen;
