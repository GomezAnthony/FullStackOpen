import axios from 'axios';
const baseUrl = '/api/notes';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
