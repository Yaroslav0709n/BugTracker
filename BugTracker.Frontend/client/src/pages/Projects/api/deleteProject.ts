import axios, { AxiosRequestConfig } from 'axios';
import getToken from '../../../common/getToken'

export const deleteProject = async (projectId: string) => {
    try {
      const config: AxiosRequestConfig = {
        url: `https://localhost:7088/api/Project?projectId=${projectId}`,
        method: 'DELETE',
        headers: getToken(),
      };

      await axios(config);
      window.location.reload();
    } catch (error: any) {
      console.log(error.response);
    }
};