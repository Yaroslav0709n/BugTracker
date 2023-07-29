import axios, { AxiosRequestConfig } from "axios";
import getToken from "../../../common/getToken";

export const deleteTicket = async (ticketId: string) => {
  try {
    const config: AxiosRequestConfig = { 
      url: `https://localhost:7088/api/Ticket?ticketId=${ticketId}`,
      method: 'DELETE',
      headers: getToken()
    };

    await axios(config);
    window.location.reload();
  } catch (error: any) {
    console.log(error.response);
  }  
}