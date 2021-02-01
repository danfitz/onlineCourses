import { useEffect, useState } from 'react';
import {
  Accuracy,
  requestPermissionsAsync,
  watchPositionAsync,
} from 'expo-location';

const useLocation = (shouldTrack, callback) => {
  const [err, setErr] = useState('');

  useEffect(() => {
    let subscriber = null;
    const startWatching = async () => {
      try {
        const { granted } = await requestPermissionsAsync();
        if (!granted) {
          throw new Error('Location permission not granted');
        }
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10,
          },
          callback
        );
        setSubscriber(sub);
      } catch (e) {
        setErr(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else if (subscriber) {
      subscriber.remove();
      subscriber = null;
    }

    return () => {
      if (subscriber) {
        subscriber.remove();
        subscriber = null;
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};

export default useLocation;
