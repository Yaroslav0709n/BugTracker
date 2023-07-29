import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import axios, { AxiosRequestConfig } from 'axios';
import errorStyles from '../assets/componentsstyle/errorstyle.module.css'
import modalStyles from '../assets/componentsstyle/modalstyle.module.css'
import { TicketDto } from '../interface/Tickets';
import { User } from '../interface/Users';
import { Priorities } from '../enum/Priorities';
import { Statuses } from '../enum/Statuses';
import { Types } from '../enum/Types';
import InputInfo from './Inputs/InputInfo';
import AddInput from './Inputs/AddInput';
import ChooseOptions from './ChooseTicketOptions';
import CheckBoxUser from './CheckBoxUser';
import ControlUsersButtons from './Buttons/ControlUsersButtons';
import {createTicket} from '../pages/Tickets/api/createTicket';
import handleInputChange from '../common/inputHandler';

interface AddTicketModalProps {
  isOpen: boolean;
  onCancel: () => void;
  projectId: string;
}

const AddTicketModal: React.FC<AddTicketModalProps> = ({
  isOpen,
  onCancel,
  projectId,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});
  const [isUsersFormVisible, setIsUsersFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [newTicket, setNewTicket] = useState<TicketDto>({
    name: '',
    description: '',
    priority: Priorities.Low,
    status: Statuses.Open,
    type: Types.Bug
  });
  const token = localStorage.getItem('accessToken');
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const config: AxiosRequestConfig ={
          url:`https://localhost:7088/api/ProjectUser?projectId=${projectId}`,
          method: 'GET',
          headers
        }
        const response = await axios(config);
        const userData = response.data;
        setUsers(userData.$values);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    fetchUsers();
  }, [projectId]);


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className={modalStyles.modal}
      overlayClassName={modalStyles.modalOverlay}
    >
      <h3>Create ticket</h3>
        <div>
          <InputInfo className={`${error.name && errorStyles.errorLabel}`}>
            Title:
          </InputInfo>
          {error.name && <div className={errorStyles.error}>{error.name}</div>}
          <AddInput
            type="text"
            id="name"
            name="name"
            value={newTicket.name}
            onChange={(e) => handleInputChange(e, setNewTicket)}
            onFocus={() => setError((prevError) => ({ ...prevError, name: '' }))}
            className={`${error.name && errorStyles.errorInput}`}
          />
        </div>
        <div>
          <InputInfo className={`${error.description && errorStyles.errorLabel}`}>
            Description:
          </InputInfo>
          {error.description && <div className={errorStyles.error}>{error.description}</div>}
          <AddInput
            type="text"
            id="description"
            name="description"
            value={newTicket.description}
            onChange={(e) => handleInputChange(e, setNewTicket)}
            onFocus={() => setError((prevError) => ({ ...prevError, description: '' }))}
            className={`${error.description && errorStyles.errorInput}`}
          />
        </div>
        <ChooseOptions newTicket={newTicket} handleInputChange={(e:any) => handleInputChange(e, setNewTicket)}/> 
        {isUsersFormVisible && (
          <CheckBoxUser style={{height: "100px"}} 
                        users={users} 
                        selectedUsers={selectedUsers} 
                        setSelectedUsers={setSelectedUsers}>
              You can add users into ticket
          </CheckBoxUser>
        )}
        <ControlUsersButtons
          onClick={() => createTicket(projectId, newTicket, selectedUsers, setIsLoading, setError)}
          onCancel={onCancel}
          isLoading={isLoading} 
          isUsersFormVisible={isUsersFormVisible}
          setIsUsersFormVisible={setIsUsersFormVisible}
        />
    </Modal>
  );
};

export default AddTicketModal;