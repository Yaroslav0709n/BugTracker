import axios, { AxiosRequestConfig } from "axios";
import getToken from "../../../../common/getToken";

export const deleteUser = async (userId: string, ticketId: string | undefined) => {
    try {
      const config: AxiosRequestConfig = {
        url: `https://localhost:7088/api/TicketUser?userId=${userId}&ticketId=${ticketId}`,
        method: 'DELETE',
        headers: getToken(),
      };

      await axios(config);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };