import { useContext } from 'react';
import { Context as TrackContext } from '../context/TrackContext';
import { Context as LocationContext } from '../context/LocationContext';
import { navigate } from '../navigationRef';

export default () => {
  const {
    state: { trackName, locations },
    resetLocationData,
  } = useContext(LocationContext);
  const { createTrack } = useContext(TrackContext);

  const saveTrack = async () => {
    await createTrack({ trackName, locations });
    resetLocationData();
    navigate('TrackList');
  };

  return [saveTrack];
};
