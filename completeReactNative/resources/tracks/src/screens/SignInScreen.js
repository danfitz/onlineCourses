import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Context as AuthContext } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';

const SignInScreen = () => {
  const { state, signIn } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <AuthForm
        title='Sign In for Tracker'
        cta='Sign In'
        errorMessage={state.errorMessage}
        onSubmit={signIn}
      />
      <NavLink
        text="Don't have an account? Go back to sign up."
        goTo='SignUp'
      />
    </View>
  );
};

SignInScreen.navigationOptions = () => ({
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

export default SignInScreen;
