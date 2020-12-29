import axios from 'axios';

const baseURL = 'http://localhost:3001/persons/';

export const getAll = () => {
  const request = axios.get(baseURL);
  return request.then((res) => res.data);
};

export const createPerson = (person) => {
  const request = axios.post(baseURL, person);
  return request.then((res) => res.data);
};

export const deletePerson = (id) => {
  const request = axios.delete(baseURL + id);
  return request.then((res) => res.data);
};

export const updatePerson = (id, person) => {
  const request = axios.put(baseURL + id, person);
  return request.then((res) => res.data);
};
