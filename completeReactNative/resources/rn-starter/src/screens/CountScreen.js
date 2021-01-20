import React, { useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

const CountScreen = () => {
  const [count, setCount] = useState(0);
  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => prevCount - 1);

  return (
    <View>
      <Button title='Increment' onPress={increment} />
      <Button title='Decrement' onPress={decrement} />
      <Text style={styles.text}>Current Count:</Text>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
  count: {
    fontSize: 30,
  },
});

export default CountScreen;
