import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.text}>Hello!</Text>
      <Button
        title='Go to Components Demo'
        onPress={() => navigation.navigate('Components')}
      />
      <Button
        title='Go to List Demo'
        onPress={() => navigation.navigate('List')}
      />
      <Button
        title='Go to Image Demo'
        onPress={() => navigation.navigate('Image')}
      />
      <Button
        title='Go to Count Demo'
        onPress={() => navigation.navigate('Count')}
      />
      <Button
        title='Go to Colors Demo'
        onPress={() => navigation.navigate('Colors')}
      />
      <Button
        title='Go to RGB Demo'
        onPress={() => navigation.navigate('Rgb')}
      />
      <Button
        title='Go to Input Demo'
        onPress={() => navigation.navigate('Input')}
      />
      <Button
        title='Go to Box Demo'
        onPress={() => navigation.navigate('Box')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;
