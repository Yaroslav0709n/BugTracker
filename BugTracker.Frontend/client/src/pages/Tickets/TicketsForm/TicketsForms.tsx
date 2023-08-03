import React, { useEffect, useState } from 'react';
import btnStyles from '../../../assets/componentsstyle/buttonstyle.module.css';
import listStyles from '../../../assets/componentsstyle/liststyle.module.css';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import CreateTicketModal from '../../../components/CreateTicketModal';
import jwt_decode from 'jwt-decode';
import AddButton from '../../../components/Buttons/AddButton';
import TicketsListComponents from '../../../components/ListComponents/TicketsListComponents';
import ItemListComponents from '../../../components/ListComponents/ItemListComponents';
import ControlButton from '../../../components/Buttons/ControlButton';
import ProjectTeamComponents from '../../../components/Team/ProjectTeamComponent';
import { deleteTicket } from '../api/deleteTicket';
import { Ticket } from '../../../interface/Tickets';

 
const TicketsForm: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [projectName, setProjectName] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddUserFormOpen, setIsAddUserFormOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');

  const token = localStorage.getItem('accessToken');
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchProject = async () => {
      if (token) {
        const decodedToken: any = jwt_decode(token);
        const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        setUserRole(role);
      } 
    
        try {
          const config: AxiosRequestConfig = {
            url: `https://localhost:7088/api/Project/project/${projectId}`,
            method: 'GET',
            headers
          };
          const response = await axios(config);
          const projectData = response.data;
          setProjectName(projectData.name);
        } catch (error: any) {
          console.log(error.response);
        }
      };
  
      
    const fetchTickets = async () => {
      try {
        const config: AxiosRequestConfig = {
          url: `https://localhost:7088/api/Ticket/project/${projectId}`,
          method: 'GET',
          headers
        };
        const response = await axios(config);
        const ticketData = response.data;
        setTickets(ticketData.$values);
      } catch (error: any) {
        console.log(error.response);
      }
    };


    fetchProject();
    fetchTickets();
  }, [projectId]);

  const handleCancelAdd = () => {
    setIsModalOpen(false);
  };

  return (
    <div style={{
                marginLeft: "260px",
      }}>
      <h1>Project "{projectName}"</h1>
      <AddButton onClick={() => setIsModalOpen(true)}>
        Add Ticket
      </AddButton>
      <TicketsListComponents className={listStyles.listStyles}>
      {tickets.map((ticket) => (
        <ItemListComponents 
                key={ticket.id} 
                onClick={() => ticket.id && navigate(`/userticket/${projectId}/${ticket.id}`)}
             >
            <h2  style={{  
                          fontSize: "13px",
                          fontWeight: "bold",
                          width: "150px",
                          wordBreak: "break-word",
                          marginRight: "10px"
                        }}>
                        {ticket.title}
            </h2>
            <p style={{  
                          fontSize: "13px",
                          width: "450px",
                          wordBreak: "break-word"
                        }}>
                        {ticket.description}
            </p>
            <p style={{
                          fontSize: "13px",
                          width: "150px",
                          marginLeft: "60px",
                          wordBreak: "break-word"
                      }}>
                {ticket.createdByUserId}
            </p>
            {ticket.createdByUserId === `${firstName} ${lastName}` && (
            <ControlButton
                className={btnStyles.redButton}
                onClick={(e) => {
                    e.stopPropagation();
                    ticket.id && deleteTicket(ticket.id)
                }}
            >
                Delete
            </ControlButton>
            )}
          </ItemListComponents>
        ))}
      </TicketsListComponents>
        <ProjectTeamComponents projectId={projectId} 
                        isAddUserFormOpen={isAddUserFormOpen} 
                        setIsAddUserFormOpen={setIsAddUserFormOpen} 
                        userRole={userRole}
        />
           
      <CreateTicketModal
        isOpen={isModalOpen}
        onCancel={handleCancelAdd}
        projectId={projectId|| ''} 
      />
    </div>
  );
};

export default TicketsForm;

