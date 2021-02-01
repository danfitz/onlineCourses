import createDataContext from './createDataContext';

const locationReducer = (state, action) => {
  switch (action.type) {
    case 'START_RECORDING':
      return {
        ...state,
        isRecording: true,
      };
    case 'STOP_RECORDING':
      return {
        ...state,
        isRecording: false,
      };
    case 'ADD_CURRENT_LOCATION':
      return {
        ...state,
        currentLocation: action.payload,
      };
    case 'ADD_LOCATION':
      return {
        ...state,
        locations: [...state.locations, action.payload],
      };
    case 'CHANGE_TRACK_NAME':
      return {
        ...state,
        trackName: action.payload,
      };
    default:
      return state;
  }
};

const startRecording = dispatch => () => dispatch({ type: 'START_RECORDING' });

const stopRecording = dispatch => () => dispatch({ type: 'STOP_RECORDING' });

const addLocation = dispatch => (location, isRecording) => {
  dispatch({ type: 'ADD_CURRENT_LOCATION', payload: location });
  console.log({ isRecording });
  if (isRecording) {
    dispatch({ type: 'ADD_LOCATION', payload: location });
  }
};

const changeTrackName = dispatch => trackName =>
  dispatch({ type: 'CHANGE_TRACK_NAME', payload: trackName });

export const { Context, Provider } = createDataContext(
  locationReducer,
  {
    startRecording,
    stopRecording,
    addLocation,
    changeTrackName,
  },
  { isRecording: false, locations: [], currentLocation: null, trackName: '' }
);
