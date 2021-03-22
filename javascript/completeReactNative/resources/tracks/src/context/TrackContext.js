import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';

const trackReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TRACKS':
      return action.payload;
    default:
      return state;
  }
};

const fetchTracks = dispatch => async () => {
  try {
    const { data } = await trackerApi.get('/tracks');
    dispatch({ type: 'SET_TRACKS', payload: data });
  } catch (error) {
    console.error(error);
  }
};

const createTrack = dispatch => async ({ trackName, locations }) => {
  try {
    await trackerApi.post('/tracks', {
      name: trackName,
      locations,
    });
  } catch (error) {
    console.error(error);
  }
};

export const { Context, Provider } = createDataContext(
  trackReducer,
  {
    fetchTracks,
    createTrack,
  },
  []
);
