import React, { useContext } from 'react';
import { Input, Button } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import useSaveTrack from '../hooks/useSaveTrack';
import Spacer from './Spacer';

const TrackForm = () => {
  const {
    state: { trackName, isRecording, locations },
    startRecording,
    stopRecording,
    changeTrackName,
  } = useContext(LocationContext);
  const [saveTrack] = useSaveTrack();

  return (
    <>
      <Spacer>
        <Input
          placeholder='Enter name'
          value={trackName}
          onChangeText={changeTrackName}
        />
      </Spacer>
      <Spacer>
        {isRecording ? (
          <Button title='Stop' onPress={stopRecording} />
        ) : (
          <Button title='Start Recording' onPress={startRecording} />
        )}
      </Spacer>
      {!isRecording && locations.length ? (
        <Spacer>
          <Button title='Save Recording' onPress={saveTrack} />
        </Spacer>
      ) : null}
    </>
  );
};

export default TrackForm;
