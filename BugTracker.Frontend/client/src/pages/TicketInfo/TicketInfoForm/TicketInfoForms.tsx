import axios, { AxiosRequestConfig } from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TicketUsers from '../../../components/TicketUsers';
import jwt_decode from 'jwt-decode';
import FullTicketInfo from '../../../components/FullTicketInfoComponents';
import { TicketInfo } from '../../../interface/Tickets';
import Commentary from '../../../components/UserCommentary';

const TicketInfoForms: React.FC = () => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [ticket, setTicket] = useState<TicketInfo>();
  const [userEmail, setUserEmail] = useState<string>('');
  const [ticketUsers, setTicketUsers] = useState<any[]>([]);
  const [userEmailExists, setUserEmailExists] = useState(false);

  const token = localStorage.getItem('accessToken');
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const config: AxiosRequestConfig = {
          url: `https://localhost:7088/api/Ticket/ticket/${ticketId}`,
          method: 'GET',
          headers,
        };
        const response = await axios(config);
        const ticketData = response.data;
        setTicket(ticketData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    const fetchTicketUsers = async () => {
      try {
        if (token) {
          const decodedToken: any = jwt_decode(token);
          const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
          setUserEmail(email);
        } 
        const config: AxiosRequestConfig = {
          url: `https://localhost:7088/api/TicketUser?ticketId=${ticketId}`,
          method: 'GET',
          headers
        };
        const response = await axios(config);
        const userData = response.data;
        setTicketUsers(userData.$values);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    fetchTicketUsers();
  }, [ticketId]); 

  useEffect(() => {
    const emailExists = ticketUsers.some((user) => user.email === userEmail);
    setUserEmailExists(emailExists);
  }, [ticketUsers, userEmail]);


  return (
    <>
    <FullTicketInfo userEmailExists={userEmailExists} 
                    ticket={ticket} 
                    />
    <Commentary />
    <TicketUsers />
    </>
  );
};

export default TicketInfoForms;