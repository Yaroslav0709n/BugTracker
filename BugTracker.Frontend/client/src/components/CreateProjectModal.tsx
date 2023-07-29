import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import errorStyles from '../assets/componentsstyle/errorstyle.module.css'
import modalStyles from '../assets/componentsstyle/modalstyle.module.css'
import {ProjectDto} from '../interface/Projects'
import {User} from '../interface/Users'
import AddInput from './Inputs/AddInput';
import InputInfo from './Inputs/InputInfo'
import ControlUsersButtons from './Buttons/ControlUsersButtons';
import CheckBoxUser from './CheckBoxUser';
import { createProject } from '../pages/Projects/api/createProject';
import { getProjectUsers } from '../pages/Projects/api/getProjectUsers';
import handleInputChange from '../common/inputHandler';
 

interface AddProjectModalProps {
  isOpen: boolean;
  onCancel: () => void;
  newProject: ProjectDto;
  setNewProject: React.Dispatch<React.SetStateAction<ProjectDto>>;
}

const CreateProjectModal: React.FC<AddProjectModalProps> = ({
  isOpen,
  onCancel,
  newProject,
  setNewProject
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUsersFormVisible, setIsUsersFormVisible] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<{ [key: string]: boolean }>({});
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchUsersData = async () => {
      const usersData = await getProjectUsers();
      setUsers(usersData);
    };

    fetchUsersData();
  }, []);


  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      className={modalStyles.modal}
      overlayClassName={modalStyles.modalOverlay}
    >
      <div>
        <h3>Create project</h3>
        <InputInfo className={`${error.name && errorStyles.errorLabel}`}>
          Title:
        </InputInfo>
        {error.name && <div className={errorStyles.error}>{error.name}</div>}
        <AddInput 
          id="name"
          type="text"
          name="name"
          value={newProject.name}
          onChange={(e) => handleInputChange(e, setNewProject)}
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
          id="description"
          type="text"
          name="description"
          value={newProject.description}
          onChange={(e) => handleInputChange(e, setNewProject)}
          onFocus={() => setError((prevError) => ({ ...prevError, description: '' }))}
          className={`${error.description && errorStyles.errorInput}`}
        />
      </div>
      {isUsersFormVisible && (
        <CheckBoxUser style={{height: "200px"}} 
                      users={users} 
                      selectedUsers={selectedUsers} 
                      setSelectedUsers={setSelectedUsers}>
                        You can add users into project
        </CheckBoxUser>
      )}
      <ControlUsersButtons 
        onClick={() => createProject(newProject, selectedUsers, setIsLoading, setError)}
        onCancel={onCancel}
        isLoading={isLoading} 
        isUsersFormVisible={isUsersFormVisible}
        setIsUsersFormVisible={setIsUsersFormVisible}
      />
    </Modal>
  );
};

export default CreateProjectModal;