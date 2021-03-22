import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ColorControl from '../components/ColorControl';

const genRgbString = ({ red, green, blue }) => `rgb(${red}, ${green}, ${blue})`;

const RgbScreen = () => {
  const [rgb, setRgb] = useState({ red: 0, green: 0, blue: 0 });
  const onIncrease = color => {
    if (rgb[color] < 255) {
      setRgb({ ...rgb, [color]: rgb[color] + 5 });
    }
  };
  const onDecrease = color => {
    if (rgb[color] > 0) {
      setRgb({ ...rgb, [color]: rgb[color] - 5 });
    }
  };

  return (
    <View style={styles.container}>
      <ColorControl
        colorName='red'
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
      <ColorControl
        colorName='green'
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
      <ColorControl
        colorName='blue'
        onIncrease={onIncrease}
        onDecrease={onDecrease}
      />
      <View
        style={{ height: 200, width: 200, backgroundColor: genRgbString(rgb) }}
      />
    </View>
  );
};

const styles = StyleSheet.create({ container: { margin: 20 } });

export default RgbScreen;
