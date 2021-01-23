import axios from 'axios';

export default axios.create({
  baseURL: 'https://api.yelp.com/v3/businesses',
  headers: {
    Authorization:
      'Bearer l6lDAQUqYagCF8ENK_ZknSYksjq9NlxxpKPKVGg4IVZaD1ffHKDNAPkOk9flABBQlqhH-_I6qgagyW090AFjoDcL5UeMalbaccLyAqs_qdpi5lgVtNeEKgn1myAKYHYx',
  },
});
