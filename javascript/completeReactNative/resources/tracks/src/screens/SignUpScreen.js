import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignUpScreen = () => {
  const { state, signUp, clearError } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <NavigationEvents onWillFocus={clearError} />
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
