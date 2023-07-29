import { AxiosRequestConfig } from 'axios';


const getToken = () => {
  const token = localStorage.getItem('accessToken');
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
  };
  return headers;
}

export default getToken;
