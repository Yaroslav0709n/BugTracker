import axios, { AxiosRequestConfig } from "axios";
import getToken from "../../../common/getToken";
import { Priorities } from '../../../enum/Priorities';
import { Statuses } from '../../../enum/Statuses';
import { Types } from '../../../enum/Types';
import { TicketDto } from "../../../interface/Tickets";
import handleError from '../error/errorHandler';

export const createTicket = async (  
    projectId: string, 
    newTicket: TicketDto, 
    selectedUsers: {[key: string]: boolean;},  
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    setError: React.Dispatch<React.SetStateAction<{
        [key: string]: string;
    }>>,
    ) => {
    try {
      setIsLoading(true);
      const config = {
        url: `https://localhost:7088/api/Ticket?projectId=${projectId}`,
        method: 'POST', 
        headers: getToken(),
        data: {
          title: newTicket.name,
          description: newTicket.description,
          priority: newTicket.priority === Priorities.Low ? 0 : newTicket.priority === Priorities.Medium ? 2 : 3,
          status: newTicket.status === Statuses.Open ? 0 : newTicket.status === Statuses.InProgress ? 2 : 3,
          type: newTicket.type === Types.Bug ? 0 : newTicket.type === Types.Feature ? 2 : 3,
        },
      };

      const response = await axios(config);
      console.log(response.data)
      setIsLoading(false);
      window.location.reload();
  
      const config2: AxiosRequestConfig = {
        url: `https://localhost:7088/api/Ticket/project/${projectId}`,
        method: 'GET',
        headers: getToken(),
      };
      const response2 = await axios(config2);
      const userTickets = response2.data.$values;
      const latestTicketId = userTickets[userTickets.length - 1].id;
      await handleAddUsersToTicket(latestTicketId, selectedUsers);
    } catch (error: any) {
      setIsLoading(false);
      handleError(error, setError)
    }
  };

  const handleAddUsersToTicket = async (ticketId: string, selectedUsers: {[key: string]: boolean;}) => {
    try {
      for (const userId of Object.keys(selectedUsers)) {
        if (selectedUsers[userId]) {
          await addUserToTicket(userId, ticketId);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  const addUserToTicket = async (userId: string, ticketId: string) => {
    try {
      const config: AxiosRequestConfig = {
        url: `https://localhost:7088/api/TicketUser?userId=${userId}&ticketId=${ticketId}`,
        method: 'POST',
        headers: getToken(),
      };
      await axios(config);
      window.location.reload();
    } catch (error) { 
      console.log(error);
    }  
  };

