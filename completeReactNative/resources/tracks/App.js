import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Provider as AuthProvider } from './src/context/AuthContext';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import AccountScreen from './src/screens/AccountScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TrackCreateScreen from './src/screens/TrackCreateScreen';
import TrackDetailScreen from './src/screens/TrackDetailScreen';
import TrackListScreen from './src/screens/TrackListScreen';

import { setNavigator } from './src/navigationRef';

const switchNavigator = createSwitchNavigator(
  {
    ResolveAuth: ResolveAuthScreen,
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
  },
  { initialRouteName: 'ResolveAuth' }
);

const App = createAppContainer(switchNavigator);

export default () => (
  <AuthProvider>
    <App ref={setNavigator} />
  </AuthProvider>
);
