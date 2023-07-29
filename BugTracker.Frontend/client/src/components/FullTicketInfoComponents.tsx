import React, { CSSProperties, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from '../assets/commonstyle/projects.module.css';
import errorStyles from '../assets/componentsstyle/errorstyle.module.css';
import btnStyles from '../assets/componentsstyle/buttonstyle.module.css';
import ticketStyles from '../assets/componentsstyle/tickets.module.css';

import moment from 'moment';
import { TicketInfo, TicketInfoDto } from '../interface/Tickets';
import { mapPriority, mapStatus, mapType } from '../enumUtils';
import { editTicket, updateMethodTicket } from '../pages/Tickets/api/updateTicket';
import ControlButton from './Buttons/ControlButton';
import UpdateInput from './Inputs/UpdateInput';
import UpdateTicketOptions from './UpdateTicketOptions';

interface ComponentsProps{
    userEmailExists: boolean;
    ticket: TicketInfo | undefined;
}

const ticketContainer:CSSProperties = {
  position: "absolute",
  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.8)",
  padding: "20px",
  display: "flex",
  marginLeft: "260px",
  marginTop: "20px",
  width: "500px",
  borderRadius: "5px"
}

const ticketField:CSSProperties = {
  marginBottom: "10px",
  fontSize: "14px",
  wordWrap: "break-word",
  width: "220px",
}

const FullTicketInfo: React.FC<ComponentsProps> = ({userEmailExists, ticket}) => {
  const { ticketId } = useParams<{ ticketId: string }>();
  const [isEditing, setIsEditing] = useState(false);
  const [updateTicket, setUpdateTicket] = useState<TicketInfoDto>({
    title: '',
    description: '',
    updateTime: '',
  });
  const [error, setError] = useState<{ [key: string]: string }>({});
  const [ticketPriority, setTicketPriority] = useState<number>(0);
  const [ticketStatus, setTicketStatus] = useState<number>(0);
  const [ticketType, setTicketType] = useState<number>(0);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUpdateTicket({
      title: ticket?.title || '',
      description: ticket?.description || '',
      updateTime: ticket?.updateTime || '',
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateTicket((prevTicket) => ({
      ...prevTicket,
      [name]: value,
    }));
  };


  return (
    <div style={ticketContainer}>
      <div className={ticketStyles.ticketContent}>
        {isEditing ? (
          <>
            <div>
              <h2 style={{marginBottom: "10px",
                          fontSize: "20px"}}>
                Ticket
                <UpdateInput
                  name="title"
                  value={updateTicket.title}
                  onChange={handleInputChange}
                  onFocus={() => setError((prevError) => ({ ...prevError, name: '' }))}
                  className={`${error.name && errorStyles.errorInput}`}
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  style={{fontSize: "19px"}}
                />
              </h2>
              <h4>Description</h4>
              <UpdateInput
                name="description"
                value={updateTicket.description}
                onChange={handleInputChange}
                onFocus={() => setError((prevError) => ({ ...prevError, description: '' }))}
                className={`${error.description && errorStyles.errorInput}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
              />
              <h4>Create time</h4>
              <p>
                {moment(ticket?.createTime).format('YYYY-MM-DD HH:mm')}
              </p>
              <h4>Update time</h4>
              <p>
                {moment(updateTicket.updateTime).format('YYYY-MM-DD HH:mm')}
              </p>
              <h4>Creator</h4>
              <p>{ticket?.createdUserName}</p>
            </div>
            <div style={{position:"absolute", 
                         marginLeft: "320px",
                         marginTop: "360px"}}>
            <ControlButton
                className={btnStyles.updateButton}
                onClick={(e) => {
                                e.stopPropagation();
                                updateMethodTicket(updateTicket, 
                                            ticketId, 
                                            ticketPriority,
                                            ticketStatus,
                                            ticketType,
                                            setError, 
                                            setIsEditing)}}
              >
                Update
              </ControlButton>
              <ControlButton
                className={btnStyles.cancelEditButton}
                onClick={handleCancelEdit}
              >
                Cancel
              </ControlButton>
              </div>
              <UpdateTicketOptions setTicketPriority={setTicketPriority} 
                                   setTicketStatus={setTicketStatus}
                                   setTicketType={setTicketType}
                                   ticketPriority={ticketPriority}
                                   ticketStatus={ticketStatus}
                                   ticketType={ticketType}/>
          </>
        ) : (
          <>
              <div>
                <h2 style={{marginBottom: "10px",
                            fontSize: "20px"}}>Ticket {ticket?.title}</h2>
                <h4>Description</h4>
                <p style={ticketField}>{ticket?.description}</p>
                <h4>Create time</h4>
                <p style={ticketField}>
                  {moment(ticket?.createTime).format('YYYY-MM-DD HH:mm')}
                </p>
                <h4>Update time</h4>
                <p style={ticketField}>
                  {moment(ticket?.updateTime).format('YYYY-MM-DD HH:mm')}
                </p>
                <h4>Creator</h4>
                <p style={{marginBottom: "5px",
                           fontSize: "14px"}}>{ticket?.createdUserName}</p>
              </div>
              <div style={{position:"absolute", 
                         marginLeft: "370px",
                         marginTop: "330px"}}>
                {userEmailExists == true && (
                  <ControlButton
                    className={btnStyles.updateButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      editTicket(setIsEditing, 
                                setUpdateTicket, 
                                ticket, 
                                setTicketPriority, 
                                setTicketStatus,
                                setTicketType)}}
                    >
                      Edit
                    </ControlButton>
                )}
              </div>
              <div className={ticketStyles.ticketSelect}>
                <h4>Priority</h4>
                <p className={ticketStyles.ticketOptions}>
                  {ticket ? mapPriority(ticket.priority) : ''}
                </p>
                <h4>Status</h4>
                <p className={ticketStyles.ticketOptions}>
                  {ticket ? mapStatus(ticket.status) : ''}
                </p>
                <h4>Type</h4>
                <p className={ticketStyles.ticketOptions}>
                  {ticket ? mapType(ticket.type) : ''}
                </p>
              </div>              
            </>
        )}
      </div>
    </div>
  );
};

export default FullTicketInfo;