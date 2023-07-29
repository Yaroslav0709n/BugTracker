import axios, { AxiosRequestConfig } from 'axios';
import React, { CSSProperties, useEffect, useState } from 'react';
import { User } from '../../interface/Users';
import SaveCancelUsersButtons from '../Buttons/SaveCancelUsersButtons';
import getToken from '../../common/getToken';

interface UserListProps {
  ticketId: string | undefined;
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


const AddTicketUsersList: React.FC<UserListProps> = ({ ticketId, projectId, isAddUserFormOpen, setIsAddUserFormOpen }) => {
    const [nonProjectUsers, setNonProjectUsers] = useState<User[]>([]); 
    const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const fetchProjectUsers = async () => {
          try {
            const config: AxiosRequestConfig = {
              url: `https://localhost:7088/api/TicketUser/${ticketId}?projectId=${projectId}`,
              method: 'GET',
              headers: getToken(),
            };
            const response = await axios(config);
            const usersData = response.data;
            setNonProjectUsers(usersData.$values);
          } catch (error) {
            console.log(error);
          }
      };
    
      fetchProjectUsers();
    }, [ticketId]);

    const handleAddUsersToProject = async (ticketId: string) => {
    try {
      for (const userId of Object.keys(selectedUsers)) {
            if (selectedUsers[userId]) {
                await addUserToProject(userId, ticketId);
            }
        }
        }catch (error) {
            console.log(error);
        }
    };
    const addUserToProject = async (userId: string, ticketId: string) => {
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
        <SaveCancelUsersButtons onClick={(e:any) => handleAddUsersToProject(ticketId ?? '')}        >
          Save Users
        </SaveCancelUsersButtons>
      )}
      {isAddUserFormOpen && (
        <SaveCancelUsersButtons style={{marginLeft: "100px"}} onClick={handleToggleCanceleAddUserForm}>
          Cancel
        </SaveCancelUsersButtons>
      )}
  </div>
  );
};

export default AddTicketUsersList;