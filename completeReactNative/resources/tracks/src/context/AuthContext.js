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
    case 'CLEAR_ERROR':
      return {
        ...state,
        errorMessage: '',
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
    dispatch({
      type: 'AUTH_ERROR',
      payload: 'Something went wrong with sign up',
    });
  }
};

const signIn = dispatch => async ({ email, password }) => {
  try {
    const {
      data: { token },
    } = await trackerApi.post('/signin', { email, password });
    await AsyncStorage.setItem('token', token);
    dispatch({ type: 'SIGN_IN', payload: token });
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: 'AUTH_ERROR',
      payload: 'Something went wrong with sign in',
    });
  }
};
const signOut = dispatch => async () => {
  await AsyncStorage.removeItem('token');
  dispatch({ type: 'SIGN_OUT' });
  navigate('SignIn');
};

const clearError = dispatch => () => dispatch({ type: 'CLEAR_ERROR' });

const tryLocalSignIn = dispatch => async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    dispatch({ type: 'SIGN_IN', payload: token });
    navigate('TrackList');
  } else {
    navigate('loginFlow');
  }
};

export const { Context, Provider } = createDataContext(
  authReducer,
  { signUp, signIn, signOut, clearError, tryLocalSignIn },
  { token: null, errorMessage: '' }
);
