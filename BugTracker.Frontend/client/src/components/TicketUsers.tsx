import { AxiosRequestConfig } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { UserContext } from '../UserContext';
import TicketTeamComponents from './Team/TicketTeamComponent';


const TicketUsers: React.FC = () => {
    const { ticketId } = useParams<{ ticketId: string }>();
    const { projectId } = useParams<{ projectId: string }>();
    const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
    const { userId } = useContext(UserContext);
    const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
    const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
    const [userRole, setUserRole] = useState<string>('');
    const [userEmail, setUserEmail] = useState<string>('');

    const token = localStorage.getItem('accessToken');
    const headers: AxiosRequestConfig['headers'] = {
      Authorization: `Bearer ${token}`,
    };
  
    useEffect(() => {
      if (userId) {
        localStorage.setItem('firstName', firstName);
        localStorage.setItem('lastName', lastName);
      }
    }, [userId, firstName, lastName]);  

    useEffect(() => {
      const fetchTicketUsers = async () => {
        try {
          if (token) {
            const decodedToken: any = jwt_decode(token);
            const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
            const email = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
            setUserEmail(email);
            setUserRole(role);
          } 
        } catch (error: any) {
          console.log(error.response);
        }
      };
  
      fetchTicketUsers();
    }, [ticketId]);
  
  return (
    <TicketTeamComponents userRole={userRole} 
                          ticketId={ticketId} 
                          projectId={projectId} 
                          isAddUserFormOpen={isAddUserFormOpen} 
                          setIsAddUserFormOpen={setIsAddUserFormOpen} />
  );
};

export default TicketUsers;