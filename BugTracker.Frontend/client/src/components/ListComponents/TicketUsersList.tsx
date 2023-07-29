import React, { CSSProperties, useEffect, useState } from 'react';
import HeaderList from './HeaderUsersList';
import listStyles from '../../assets/componentsstyle/liststyle.module.css';
import btnStyles from '../../assets/componentsstyle/buttonstyle.module.css';
import axios, { AxiosRequestConfig } from 'axios';
import getToken from '../../common/getToken';
import ControlButton from '../Buttons/ControlButton';
import {deleteUser} from '../../pages/TicketInfo/api/users/deleteUser'

interface ListProps {
    ticketId: string | undefined;
    userRole: string | undefined;
}

const teamListContainer:CSSProperties = {
    padding: "10px",
    marginBottom: "10px",
    display: "flex", 
    cursor: "pointer",
    width: "550px",
    fontSize: "14px",
    backgroundColor: "#DCDCDC",
    borderRadius: "10px"
};


const TicketUsersList: React.FC<ListProps> = ({ticketId, userRole}) => {
    const [ticketUsers, setTicketUsers] = useState<any[]>([]);

    useEffect(() => { 

        const fetchTicketUsers = async () => {
          try {
            const config: AxiosRequestConfig = {
              url: `https://localhost:7088/api/TicketUser?ticketId=${ticketId}`,
              method: 'GET',
              headers: getToken()
            };
            const response = await axios(config);
            setTicketUsers(response.data.$values);
          } catch (error: any) {
            console.log(error.response);
          }
        };
    
        fetchTicketUsers();
      }, [ticketId]);

    return (
            <div>
                <HeaderList style={teamListContainer}>
                    Ticket executors
                </HeaderList>
                <ul className={listStyles.teamList}> 
                {ticketUsers.map((user) => (
                    <li key={user.$id} style={teamListContainer}>
                        <p style={{  
                                    width: "100px",
                                    wordWrap: "break-word",
                                 }}>
                                {user.firstName} {user.lastName}
                        </p> 
                        <p style={{  
                                    marginLeft: "20px",
                                    width: "200px",
                                    wordWrap: "break-word",
                                  }}> 
                                 {user.email}
                        </p>
                        <p style={{  
                                    marginLeft: "30px",
                                    width: "120px",
                                    wordWrap: "break-word",
                                  }}>
                                  {user.role}
                        </p>
                        {userRole === 'Project Manager' && (
                        <ControlButton
                            className={btnStyles.deleteButton}
                            onClick={() => deleteUser(user.id, ticketId)}
                        >
                            Delete  
                        </ControlButton>
                )}
                    </li>
                ))}
                </ul>
        </div> 
  );
};

export default TicketUsersList;