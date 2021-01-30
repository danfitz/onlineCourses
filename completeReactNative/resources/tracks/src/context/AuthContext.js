import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        token: action.payload,
        errorMessage: '',
      };
    case 'SIGN_OUT':
      return {
        ...state,
        token: null,
        errorMessage: '',
      };
    case 'AUTH_ERROR':
      return {
        ...state,
        errorMessage: action.payload,
      };
    default:
      return state;
  }
};

const signUp = dispatch => async ({ email, password }) => {
  try {
    const {
      data: { token },
    } = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', token);
    dispatch({ type: 'SIGN_IN', payload: token });
    navigate('TrackList');
  } catch (error) {
    // If signing up fails, reflect an error message somewhere
    dispatch({
      type: 'AUTH_ERROR',
      payload: 'Something went wrong with sign up',
    });
  }
};

const signIn = dispatch => ({ email, password }) => {
  // Make API request
  // If successful, modify state
  // If signing in fails, reflect an error message somewhere
};
const signOut = dispatch => () => dispatch({ type: 'SIGN_OUT' });

export const { Context, Provider } = createDataContext(
  authReducer,
  { signUp, signIn, signOut },
  { token: null, errorMessage: '' }
);
