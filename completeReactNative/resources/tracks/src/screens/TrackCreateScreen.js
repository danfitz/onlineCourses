import '../_mockLocation';
import React, { useContext, useCallback } from 'react';
import { SafeAreaView, withNavigationFocus } from 'react-navigation';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import { Context as LocationContext } from '../context/LocationContext';
import useLocation from '../hooks/useLocation';
import Map from '../components/Map';
import TrackForm from '../components/TrackForm';

const TrackCreateScreen = ({ isFocused }) => {
  const {
    state: { isRecording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(location => addLocation(location, isRecording), [
    isRecording,
  ]);
  const [err] = useLocation(isFocused || isRecording, callback);

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <Text h2>Create a Track</Text>
      <Map />
      {err ? <Text>Please enable location services</Text> : null}
      <TrackForm />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default withNavigationFocus(TrackCreateScreen);
