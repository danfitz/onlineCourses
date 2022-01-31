import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

const useRestaurants = defaultTerm => {
  const [restaurants, setRestaurants] = useState([]);
  const [failed, setFailed] = useState(false);

  const getRestaurants = async searchTerm => {
    try {
      const { data: { businesses = [] } = {} } = await yelp.get('/search', {
        params: { term: searchTerm, location: 'Toronto', limit: 50 },
      });
      setRestaurants(businesses);
      setFailed(false);
    } catch (error) {
      setFailed(true);
    }
  };

  useEffect(() => {
    getRestaurants(defaultTerm);
  }, []);

  return [restaurants, getRestaurants, failed];
};

export default useRestaurants;
