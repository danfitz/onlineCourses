import axios from "axios";

const instance = axios.create({
  baseURL: "https://df-burger-builder.firebaseio.com"
});

export default instance;