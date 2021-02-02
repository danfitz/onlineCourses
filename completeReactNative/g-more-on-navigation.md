---
title: 'More on Navigation'
part: 7
date: '2021-01-24'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# More on Navigation

## Navigation with Parameters

Suppose you have a restaurant app that displays a list of restaurants. This is your `RestaurantsScreen`.

Suppose now that when you tap one of the `RestaurantCard` components, it fetches details on that restaurant from an API and then displays those details in a new `DetailsScreen`.

**Question**: How do you use `react-navigation` to pass the restaurant ID to the `DetailsScreen`, so it can fetch the details?

First, you have to gain access to the `navigation` object at the relevant child component in `RestaurantsScreen`. Easiest way is to use `withNavigation` (or `useNavigation`).

```js
const RestaurantCard = ({ navigation, id }) => (
  <TouchableOpacity onPress={() => navigation.navigate('Details', { id })}>
    <Text>This is restaurant {id}</Text>
  </TouchableOpacity>
);

export default withNavigation(RestaurantCard);
```

Then, in the `DetailsScreen` you now have access to the `id` parameter using `navigation.getParam`.

```js
const DetailsScreen = ({ navigation }) => (
  <Text>Displaying details for restaurant {navigation.getParam('id')}</Text>
);
```

## Adding Content to Screen Header

### `headerRight`

Suppose we want to add a button to the right side of our screen's header.

To do this, just add a `navigationOptions` property to your `Screen` component.

```js
const IndexScreen = () => <Text>Homepage</Text>;

// This adds a + icon to the right of the header that sends
// the user to the `CreateScreen` screen
IndexScreen.navigationOptions = ({ navigation: { navigate } }) => ({
  headerRight: () => (
    <TouchableOpacity onPress={() => navigate('Create')}>
      <Feather name='plus' size={30} />
    </TouchableOpacity>
  ),
});
```

**Note**: Notice how `navigationOptions` has access to the same props as `IndexScreen`.

## `navigation.addListener`

The `navigation` object has the useful ability to add event listeners for navigation-related events. One very useful one would be: `'didFocus'`:

```js
useEffect(() => {
  getBlogPosts();

  const listener = navigation.addListener('didFocus', getBlogPosts);
  return listener.remove; // cleanup
}, []);
```

In the above code snippet, we fetch a list of blog posts

- On mount, and
- Whenever the target component is in focus.

## Types of Navigators

`react-navigation` provides a bunch of navigator types out of the box:

- Stack navigator
  - Places each screen on top of each other in a stack, creating transitions between screens
- Drawer navigator
  - Places screens in a drawer, where you pull it out with a touch gesture
- Bottom tab navigator
  - Creates a navigation tab at the bottom for each screen
- Switch navigator
  - Creates a sharp contrast between screens (good for when the screens are unrelated)

### Combining navigators

When your app uses multiple navigators at the same time, it looks something like this (based on v4 of `react-navigation`):

```js
const switchNavigator = createSwitchNavigator({
  loginFlow: createStackNavigator({
    SignUp: SignUpScreen,
    SignIn: SignInScreen,
  }),
  mainFlow: createBottomTabNavigator({
    Account: AccountScreen,
    TrackCreate: TrackCreateScreen,
    trackListFlow: createStackNavigator({
      TrackList: TrackListScreen,
      TrackDetail: TrackDetailScreen,
    }),
  }),
});
```

## Navigation Events

When a screen is part of a navigator _and_ you are in that navigator, it doesn't really unmount when you navigate to another screen. As a result, in order to make changes to content, you will need to listen for **navigation events**.

There are at least 2 ways to do this (probably more):

- `NavigationEvents` component appended into JSX
- `navigation.addListener`

```js
// `NavigationEvents` approach
const MyScreen = () => (
  <View>
    <NavigationEvents onWillFocus={() => console.log('Do something!')} />
    <Text>My Screen</Text>
  </View>
);

// `navigation.addListener` approach
const MyScreen = ({ navigation }) => {
  useEffect(() => {
    const listener = navigation.addListener('focus', () =>
      console.log('Do something!')
    );
    return listener.remove;
  }, []);

  return <Text>My Screen</Text>;
};
```

**Note**: The exact syntax may be different, as React Native is always changing.
