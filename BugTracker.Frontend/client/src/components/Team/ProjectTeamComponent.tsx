import React, { CSSProperties, useEffect, useState } from 'react';
import AddButton from '../Buttons/AddButton';
import AddUsersList from '../ListComponents/AddProjectUsersList';
import ProjectUsersList from '../ListComponents/ProjectUsersList';

interface TeamProps {
  userRole: string;
  projectId: string | undefined;
  isAddUserFormOpen: boolean;
  setIsAddUserFormOpen: (value: React.SetStateAction<boolean>) => void;
}

const teamContainer:CSSProperties = {
    marginTop: "50px",
    marginBottom: "50px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.8)",
    borderRadius: "4px",
    padding: "20px",
    width: "1025px",
    height: "450px",
    position: "absolute"
};

const ProjectTeamComponents: React.FC<TeamProps> = ({userRole, projectId, isAddUserFormOpen, setIsAddUserFormOpen}) => {
  const handleToggleAddUserForm = () => {
    setIsAddUserFormOpen(true);
  };

  return (
    <div
      style={teamContainer} 
    >
        {userRole === 'Project Manager' && (
          <AddButton style={{
                              marginLeft: "650px", 
                              position: "absolute"
                            }} 
                            onClick={handleToggleAddUserForm}>
            Add users
          </AddButton>
        )}
        {isAddUserFormOpen && (
          <AddUsersList setIsAddUserFormOpen={setIsAddUserFormOpen} 
                        isAddUserFormOpen={isAddUserFormOpen} 
                        projectId={projectId}/>
        )}
        <ProjectUsersList projectId={projectId} userRole={userRole}/>
      </div>
  );
};

export default ProjectTeamComponents;