import axios from 'axios';
import { config } from '../config.js';
const baseUrl = config.apiUrl;

export const postData =  async (api, parameters) => {

  return new Promise(resolve => {
    axios.post(baseUrl+api, parameters)
    .then(function (response) {
      console.log(response.data);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("in error");
      console.log(error);

      resolve(error);
    });
  });
}

export const getData =  async (api, parameters) => {
  return new Promise(resolve => {
    axios.get(baseUrl+api, parameters)
    .then(function (response) {
      console.log(response.data);
      resolve(response.data);
    })
    .catch(function (error) {
      console.log("in error");
      console.log(error);
      resolve(error);
    });
  });
}

export const getDefaultErrorMsg =  async () => {
  return config.defaultErrorMsg;
}