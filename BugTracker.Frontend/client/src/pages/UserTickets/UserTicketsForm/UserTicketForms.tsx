import React, { useEffect, useState } from 'react';
import listStyles from '../../../assets/componentsstyle/liststyle.module.css';
import { useNavigate } from 'react-router';
import axios, { AxiosRequestConfig } from 'axios';
import { useParams } from 'react-router-dom';
import ProjectListComponents from '../../../components/ListComponents/ProjectsListComponents';
import ItemListComponents from '../../../components/ListComponents/ItemListComponents';
import Time from '../../../components/Time';


interface UserTickets{
  id?: string;
  title: string;
  description: string; 
  createTime: string;
  updateTime: string;
}


const UserTickets: React.FC = () => {
    const [tickets, setTickets] = useState<UserTickets[]>([]);
    const navigate = useNavigate();
    const { projectId } = useParams<{ projectId: string }>();

    useEffect(() => {
        const fetchTickets = async () => {
            try{
                const token = localStorage.getItem('accessToken');
                const headers: AxiosRequestConfig['headers'] = {
                    Authorization: `Bearer ${token}`,
                  };

                  const config: AxiosRequestConfig = {
                    url: 'https://localhost:7088/api/Ticket',
                    method: 'GET',
                    headers,
                  };  
                  const response = await axios(config);
                  const projectData = response.data;
                  console.log(projectData);
                  setTickets(projectData.$values);        
            }catch (error: any) {
                console.log(error.response);
              }
        };
        fetchTickets();
    }, []);

    return (
      <div  style={{
        marginLeft: "260px",
      }}>
      <h1>Tickets</h1>
      <ProjectListComponents className={listStyles.listStyles}>
      {tickets.map((ticket) => (
        <ItemListComponents key={ticket.id} 
             onClick={() => ticket.id && navigate(`/userticket/${projectId}/${ticket.id}`)}
             >
            <h2 style={{  
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
            <Time item={ticket}/>
          </ItemListComponents>
        ))}
      </ProjectListComponents>
      </div>
      );    
};

export default UserTickets;