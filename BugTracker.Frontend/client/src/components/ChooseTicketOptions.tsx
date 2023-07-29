import React, { CSSProperties, useState } from 'react';
import { TicketDto } from '../interface/Tickets';
import { Priorities } from '../enum/Priorities';
import { Statuses } from '../enum/Statuses';
import { Types } from '../enum/Types';

interface Options {
  style?: CSSProperties;
  newTicket: TicketDto;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const modalTitle:CSSProperties = {
    fontSize: "16px",
    marginBottom: "10px"
};

const modalSelect:CSSProperties ={
  display: "block", 
  fontSize: "14px",
  fontFamily: "sans-serif", 
  fontWeight: "700", 
  color: "#444",
  lineHeight: "1.3", 
  padding: ".6em 1.4em .5em .8em",
  width: "100%", 
  maxWidth: "100%", 
  height: "40px",
  boxSizing: "border-box", 
  margin: "0",
  border: "1px solid #aaa",
  boxShadow: "0 1px 0 1px rgba(0,0,0,.04)", 
  borderRadius: ".5em",
  backgroundColor: "#e4dfdf", 
}

const ChooseOptions: React.FC<Options> = ({newTicket, handleInputChange}) => {

  return (
      <div>
          <div>
            <label style={modalTitle}>
              Priority:
            </label>
            <select
              id="priority"
              name="priority"
              value={newTicket.priority}
              onChange={handleInputChange}
              style={modalSelect}
            >
              {Object.values(Priorities).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={modalTitle}>
              Status:
            </label>
            <select
              id="status"
              name="status"
              value={newTicket.status}
              onChange={handleInputChange}
              style={modalSelect}
            >
              {Object.values(Statuses).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label style={modalTitle}>
              Type:
            </label>
            <select
              id="type"
              name="type"
              value={newTicket.type}
              onChange={handleInputChange}
              style={modalSelect}
            >
              {Object.values(Types).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
        </div>
  );
};

export default ChooseOptions;