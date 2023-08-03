import axios, { AxiosRequestConfig } from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react';
import { User } from '../../interface/Users';
import SaveCancelUsersButtons from '../Buttons/SaveCancelUsersButtons';
import getToken from '../../common/getToken';
import btnStyles from '../../assets/componentsstyle/buttonstyle.module.css'

interface ButtonProps {
  projectId: string | undefined;
  isAddUserFormOpen: boolean;
  setIsAddUserFormOpen: (value: React.SetStateAction<boolean>) => void;
}

const addUsersContainer:CSSProperties = {
    position: "absolute",
    marginLeft: "650px",
    marginTop: "20px",
    listStyleType: "none", 
    paddingLeft: "0",
    height: "300px",
}

const userList:CSSProperties = {
    flex: "1",
    overflowY: "auto",
    overflowX: "hidden",
    listStyleType: "none", 
    height: "300px",
    width: "370px",
    paddingLeft: "0",
    paddingTop: "0",
  }


const AddProjectUsersList: React.FC<ButtonProps> = ({ projectId, isAddUserFormOpen, setIsAddUserFormOpen }) => {
    const [nonProjectUsers, setNonProjectUsers] = useState<User[]>([]); 
    const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchProjectUsers = async () => {
          try {
            const config: AxiosRequestConfig = {
              url: `https://localhost:7088/api/ProjectUser/${projectId}`,
              method: 'GET',
              headers: getToken(),
            };
            const response = await axios(config);
            const usersData = response.data;
            console.log(usersData)
            setNonProjectUsers(usersData.$values);
          } catch (error) {
            console.log(error);
          }
      };
    
      fetchProjectUsers();
    }, [projectId]); 

    const handleAddUsersToProject = async (projectId: string) => {
    try {
      for (const userId of Object.keys(selectedUsers)) {
            if (selectedUsers[userId]) {
                await addUserToProject(userId, projectId);
            }
        }
        }catch (error) {
            console.log(error);
        }
    };
    const addUserToProject = async (userId: string, projectId: string) => {
        try {
          const config: AxiosRequestConfig = {
            url: `https://localhost:7088/api/ProjectUser?userId=${userId}&projectId=${projectId}`,
            method: 'POST',
            headers: getToken(), 
          };
          await axios(config);
          window.location.reload();
        } catch (error) {
          console.log(error);
        }
      };

  const handleUserCheckboxChange = (userId: string) => {
    setSelectedUsers((prevSelectedUsers) => ({
      ...prevSelectedUsers,
      [userId]: !prevSelectedUsers[userId],
    })); 
  };

  const handleToggleCanceleAddUserForm = () => {
    setIsAddUserFormOpen(false);
  };
  
  return (
    <div
        style={addUsersContainer}
    >
        <h4>Select Users:</h4>
        <ul style={userList}>
            {nonProjectUsers.map((user) => (
        <li key={user.id}>
          <label>
          <input
              type="checkbox"
              checked={selectedUsers[user.id] || false}
              onChange={() => handleUserCheckboxChange(user.id)}
            />
              {user.firstName} {user.lastName} - {user.role}
          </label>
        </li>
       ))}
    </ul>
    {isAddUserFormOpen && (
        <SaveCancelUsersButtons className={btnStyles.greenButton} onClick={(e:any) => handleAddUsersToProject(projectId ?? '')}        >
          Save Users
        </SaveCancelUsersButtons>
      )}
      {isAddUserFormOpen && (
        <SaveCancelUsersButtons className={btnStyles.yellowButton} style={{marginLeft: "100px"}} onClick={handleToggleCanceleAddUserForm}>
          Cancel
        </SaveCancelUsersButtons>
      )}
  </div>
  );
};

export default AddProjectUsersList;