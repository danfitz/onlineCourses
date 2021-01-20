import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

const genRandRgb = () => {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return `rgb(${red}, ${green}, ${blue})`;
};

const ColorsScreen = () => {
  const [colors, setColors] = useState([]);
  console.log(colors);
  const addColor = () => {
    setColors(prevColors => [...prevColors, genRandRgb()]);
  };

  return (
    <View>
      <Button title='Add Color' onPress={addColor} />
      <FlatList
        keyExtractor={a => a}
        data={colors}
        renderItem={({ item: color }) => (
          <View style={{ height: 100, width: 100, backgroundColor: color }} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default ColorsScreen;
