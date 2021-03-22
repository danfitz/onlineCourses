---
title: 'In-app Authentication'
part: 10
date: '2021-01-28'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# In-app Authentication

## Persisting Sign-in State

When a user signs in, leaves the app, and then returns, you want to be able to persist their authenticated state. That way they don't have to sign in every single time they want to use the app.

To accomplish this, we need to do the following:

1. Upon successful sign in, store JSON web token in local storage.
2. When app first loads, check if that JSON web token is in local storage.
3. If it is, navigate the user to an authenticated screen.
4. If it doesn't, navigate the user to the sign-in or sign-up screen.

Here's the functions we need to accomplish our goals:

```js
import { AsyncStorage } from 'react-native'; // note that this API is being deprecated

// When the user signs in...
const signIn = async () => {
  // Perform sign-in related logic, and then...
  await AsyncStorage.setItem('token', token);
};

// When the user first loads the app...
const hydrateSignIn = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    // Perform sign-in related logic
    // Navigate to authenticated screen
  } else {
    // Navigate to sign-in or sign-up screen
  }
};
```

Now we can use `hydrateSignIn` in the initial screen that appears when the app first loads. Maybe that first screen is the `SignUpScreen`.

```js
const SignUpScreen = () => {
  useEffect(() => {
    hydrateSignIn();
  }, []);

  return <Text>Sign Up Screen</Text>;
};
```

When the user then opens up the app, it will check if the user is already signed in and then navigate them to the appropriate screen.

### Preventing initial screen flicker

In the example above, suppose the user is signed in already, and we redirect them to some `HomeScreen` that is only available to display authenticated content.

The trouble with the above approach is that `SignUpScreen` will appear for a split second before redirecting th user to the `HomeScreen`. That's because `useEffect` runs _after_ mount. This is visually awkward.

To solve this, we can make the initial screen into a `ResolveAuthScreen` that returns _nothing_.

```js
const ResolveAuthScreen = () => {
  useEffect(() => {
    hydrateSignIn();
  }, []);

  return null;
};

// In root navigator...
const navigator = createStackNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
    SignUp: SignUpScreen,
    Home: HomeScreen,
  },
  {
    initialRouteName: 'ResolveAuth',
  }
);
```

Now when the app first loads, the user will see a _blank_ screen for a split second and _then_ be redirected to the appropriate screen.
