import axios from 'axios';

const baseURL = 'https://restcountries.eu/rest/v2/all';

export const getSearch = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

const weatherURL = 'http://api.weatherstack.com/current?access_key=';
const api_key = process.env.REACT_APP_API_KEY;

export const getWeather = (cityName) => {
  const request = axios.get(weatherURL + api_key + '&query=' + cityName);
  return request.then((res) => res.data);
};
