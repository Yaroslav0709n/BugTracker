import axios, { AxiosRequestConfig } from 'axios';
import getToken from '../../../common/getToken';

export const getProjectUsers = async () => {
  try {
    const config: AxiosRequestConfig = {
      url: 'https://localhost:7088/users',
      method: 'GET',
      headers: getToken(),
    };
    const response = await axios(config);
    return response.data.$values;
  } catch (error) {
    console.log(error);
    return [];
  }
};