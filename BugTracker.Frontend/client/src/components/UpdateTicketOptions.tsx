import React, { CSSProperties, useState } from 'react';
import { TicketDto } from '../interface/Tickets';
import { Priorities } from '../enum/Priorities';
import { Statuses } from '../enum/Statuses';
import { Types } from '../enum/Types';

interface Options {
  setTicketPriority: React.Dispatch<React.SetStateAction<number>>,
  setTicketStatus: React.Dispatch<React.SetStateAction<number>>;
  setTicketType: React.Dispatch<React.SetStateAction<number>>;
  ticketPriority: number;
  ticketStatus: number;
  ticketType: number  
}

const ticketSelect:CSSProperties = {
    marginTop: "43px",
    marginLeft: "120px"
};
const ticketOptions:CSSProperties = {
    marginBottom: "5px",
    fontSize: "14px",
}

const UpdateTicketOptions: React.FC<Options> = ({
        setTicketPriority, 
        setTicketStatus, 
        setTicketType,
        ticketPriority,
        ticketStatus,
        ticketType}) => {
    
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'priority') {
      setTicketPriority(Number(value));
    } else if (name === 'status') {
      setTicketStatus(Number(value));
    } else if (name === 'type') {
      setTicketType(Number(value));
    }
  };
    const priorityOptions = Object.values(Priorities).map((priority, index) => (
        <option key={index+1} value={index+1}>
          {priority}
        </option>
      ));
    
      const statusOptions = Object.values(Statuses).map((status, index) => (
        <option key={index+1} value={index+1}>
          {status}
        </option>
      ));
    
      const typeOptions = Object.values(Types).map((type, index) => (
        <option key={index+1} value={index+1}>
          {type}
        </option>
      ));

  return (
    <div style={ticketSelect}>
    <h4>Priority</h4>
    <select
      style={ticketOptions}
      name="priority"
      value={ticketPriority}
      onChange={handleSelectChange}
    >
      {priorityOptions}
    </select>
    <h4>Status</h4> 
    <select
      style={ticketOptions}
      name="status"
      value={ticketStatus}
      onChange={handleSelectChange}
    >
      {statusOptions}
    </select>
    <h4>Type</h4>
    <select
      style={ticketOptions}
      name="type"
      value={ticketType}
      onChange={handleSelectChange}
    >
      {typeOptions}
    </select>
  </div>
  );
};

export default UpdateTicketOptions;