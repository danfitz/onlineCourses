import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const RestaurantCard = ({
  name,
  image_url: imageUrl,
  rating,
  review_count: reviewCount,
}) => (
  <View style={styles.container}>
    <Image style={styles.image} source={{ uri: imageUrl }} />
    <Text style={styles.name}>{name}</Text>
    <Text>
      {rating} Stars, {reviewCount} Reviews
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { marginLeft: 15 },
  image: {
    width: 250,
    height: 120,
    borderRadius: 4,
    marginBottom: 5,
  },
  name: {
    fontWeight: 'bold',
  },
});

export default RestaurantCard;
