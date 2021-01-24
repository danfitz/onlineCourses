---
title: 'Navigation with Parameters'
part: 7
date: '2021-01-24'
categories: [frontend, mobile]
tags: [react native]
source: [udemy]
---

# Navigation with Parameters

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
