import axios, { AxiosRequestConfig } from "axios";
import getToken from "../../../../common/getToken";

export const deleteUser = async (userId: string, projectId: string | undefined) => {
    try {
      const config: AxiosRequestConfig = {
        url: `https://localhost:7088/api/ProjectUser?userId=${userId}&projectId=${projectId}`,
        method: 'DELETE',
        headers: getToken(),
      };

      await axios(config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };