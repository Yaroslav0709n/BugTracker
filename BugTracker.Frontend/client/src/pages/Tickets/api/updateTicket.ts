import axios, { AxiosRequestConfig } from "axios";
import getToken from "../../../common/getToken";
import { TicketInfo, TicketInfoDto } from "../../../interface/Tickets";
import handleError from "../error/errorHandler";
import { useState } from "react";

export const updateMethodTicket = async (
    updateTicket: TicketInfoDto, 
    ticketId: string | undefined, 
    ticketPriority: number,
    ticketStatus: number,
    ticketType: number,
    setError: React.Dispatch<React.SetStateAction<{
        [key: string]: string;
    }>>,
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>) => {

    try {
      const config: AxiosRequestConfig = {
        url: `https://localhost:7088/api/Ticket?ticketId=${ticketId}`,
        method: 'PUT',
        headers: getToken(),
        data: {
          title: updateTicket.title,
          description: updateTicket.description,
          updateTime: updateTicket.updateTime,
          priority: ticketPriority,
          status: ticketStatus,
          type: ticketType,
        },
      };
      
      await axios(config);
      setIsEditing(false);
      window.location.reload(); 
    } catch (error: any) {
        handleError(error, setError)   
    }
  };

export const editTicket = (
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
    setUpdateTicket: React.Dispatch<React.SetStateAction<TicketInfoDto>>,
    ticket: TicketInfo | undefined,
    setCurrentPriority: React.Dispatch<React.SetStateAction<number>>,
    setCurrentStatus: React.Dispatch<React.SetStateAction<number>>,
    setCurrentType: React.Dispatch<React.SetStateAction<number>>

  ) => {
    setCurrentPriority(ticket?.priority || 0);
    setCurrentStatus(ticket?.status || 0);
    setCurrentType(ticket?.type || 0);

    setIsEditing(true);
    setUpdateTicket({
      title: ticket?.title || '',
      description: ticket?.description || '',
      updateTime: ticket?.updateTime || '',
    });
  };