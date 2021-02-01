import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import Spacer from './Spacer';

const TrackForm = () => {
  const {
    state: { trackName, isRecording, locations },
    startRecording,
    stopRecording,
    changeTrackName,
  } = useContext(LocationContext);

  console.log(locations.length);

  return (
    <>
      <Spacer>
        <Input
          placeholder='Enter name'
          value={trackName}
          onChangeText={changeTrackName}
        />
      </Spacer>
      {isRecording ? (
        <Button title='Stop' onPress={stopRecording} />
      ) : (
        <Button title='Start' onPress={startRecording} />
      )}
    </>
  );
};

export default TrackForm;
