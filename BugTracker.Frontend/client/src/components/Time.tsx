import React from 'react';
import moment from 'moment';
import UserTickets from '../pages/UserTickets/UserTicketsForm/UserTicketForms';
import { Project } from '../interface/Projects';

interface TimeProps {
  item: any;
}

const TimeStyles = {
    display: 'flex',
    fontSize: "12px",
    width: "260px",
};

const AddButton: React.FC<TimeProps> = ({ item }) => {
  return (
    <div style={TimeStyles}>
        <p>
            {moment(item.createTime).format('YYYY-MM-DD HH:mm')}
        </p>
        <p style={{marginLeft: "60px"}}>
            {moment(item.updateTime).format('YYYY-MM-DD HH:mm')}
        </p>
    </div>
  );
};

export default AddButton;