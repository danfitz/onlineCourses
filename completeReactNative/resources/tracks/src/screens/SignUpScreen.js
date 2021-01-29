import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';
import Spacer from '../components/Spacer';

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <View style={styles.container}>
      <Spacer>
        <Text h3>Sign Up for Tracker</Text>
      </Spacer>
      <Input
        label='Email'
        autoCapitalize='none'
        autoCorrect={false}
        value={email}
        onChangeText={setEmail}
      />
      <Spacer />
      <Input
        label='Password'
        secureTextEntry
        autoCapitalize='none'
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      <Spacer>
        <Button title='Sign Up' />
      </Spacer>
      <Spacer>
        <Button
          title='Already have an account? Sign in'
          onPress={() => navigation.navigate('SignIn')}
        />
      </Spacer>
      <Spacer>
        <Button
          title='Go to main flow'
          onPress={() => navigation.navigate('mainFlow')}
        />
      </Spacer>
    </View>
  );
};

SignUpScreen.navigationOptions = () => ({
  headerShown: false,
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 200,
    flex: 1,
    justifyContent: 'center',
  },
});

export default SignUpScreen;
