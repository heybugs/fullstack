import axios from 'axios';

const baseURL = 'https://restcountries.eu/rest/v2/all';

export const getSearch = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};
