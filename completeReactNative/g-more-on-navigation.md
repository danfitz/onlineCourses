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
