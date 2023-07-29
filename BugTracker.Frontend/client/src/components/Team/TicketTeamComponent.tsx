import React, { CSSProperties, useEffect, useState } from 'react';
import AddButton from '../Buttons/AddButton';
import TicketUsersList from '../ListComponents/TicketUsersList';
import AddTicketUsersList from '../ListComponents/AddTicketUsersList';

interface TeamProps {
  userRole: string;
  ticketId: string | undefined;
  projectId: string | undefined;
  isAddUserFormOpen: boolean;
  setIsAddUserFormOpen: (value: React.SetStateAction<boolean>) => void;
}

const teamContainer:CSSProperties = {
    marginTop: "600px",
    marginBottom: "50px",
    marginLeft: "260px",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.8)",
    borderRadius: "4px",
    padding: "20px",
    width: "1025px",
    height: "450px",
    position: "absolute"
};

const TicketTeamComponents: React.FC<TeamProps> = ({userRole, ticketId, projectId, isAddUserFormOpen, setIsAddUserFormOpen}) => {
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
          <AddTicketUsersList setIsAddUserFormOpen={setIsAddUserFormOpen} 
                        isAddUserFormOpen={isAddUserFormOpen} 
                        ticketId={ticketId}
                        projectId={projectId}/>
        )}
        <TicketUsersList ticketId={ticketId} userRole={userRole}/>
      </div>
  );
};

export default TicketTeamComponents;