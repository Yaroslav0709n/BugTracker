import React, { CSSProperties, useEffect, useState } from 'react';
import HeaderList from './HeaderUsersList';
import listStyles from '../../assets/componentsstyle/liststyle.module.css';
import btnStyles from '../../assets/componentsstyle/buttonstyle.module.css';
import axios, { AxiosRequestConfig } from 'axios';
import getToken from '../../common/getToken';
import ControlButton from '../Buttons/ControlButton';
import {deleteUser} from '../../pages/Tickets/api/users/deleteUser'

interface ListProps {
    projectId: string | undefined;
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


const ProjectUsersList: React.FC<ListProps> = ({projectId, userRole}) => {
    const [projectUsers, setProjectUsers] = useState<any[]>([]);

    useEffect(() => { 

        const fetchProjectUsers = async () => {
          try {
            const config: AxiosRequestConfig = {
              url: `https://localhost:7088/api/ProjectUser/projectuser/${projectId}`,
              method: 'GET',
              headers: getToken()
            };
            const response = await axios(config);
            const userData = response.data;
            setProjectUsers(userData.$values);
          } catch (error: any) {
            console.log(error.response);
          }
        };
    
        fetchProjectUsers();
      }, [projectId]);

      

    return (
            <div>
                <HeaderList style={teamListContainer}>
                    Team
                </HeaderList>
                <ul className={listStyles.teamList}> 
                {projectUsers.map((user) => (
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
                            onClick={() => deleteUser(user.id, projectId)}
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

export default ProjectUsersList;