import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignUpScreen = () => {
  const { state, signUp } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        title='Sign Up for Tracker'
        cta='Sign Up'
        errorMessage={state.errorMessage}
        onSubmit={signUp}
      />
      <NavLink text='Already have an account? Sign in instead.' goTo='SignIn' />
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
  errorMessage: {
    fontSize: 16,
    color: 'red',
    marginLeft: 15,
    marginBottom: 10,
  },
  link: {
    color: 'blue',
  },
});

export default SignUpScreen;
