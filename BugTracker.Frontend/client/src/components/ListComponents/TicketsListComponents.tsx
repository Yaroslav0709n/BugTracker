import React, { CSSProperties } from 'react';

interface ListProps {
  children: React.ReactNode;
  className: string,
}

const TitleContainer: CSSProperties = {
    padding: "10px",
    marginBottom: "10px",
    display: "flex", 
    cursor: "pointer",
    width: "1050px",
    backgroundColor: "#DCDCDC",
    borderRadius: "10px",
    transition: "0.3s",  
}

const fieldOfName: CSSProperties = {
    fontSize: "13px",
    fontWeight: "bold",
    width: "150px",
    marginRight: "10px"
}

const fieldOfDescription: CSSProperties = {
    fontSize: "13px",
    width: "450px",
}

const fieldCreatedBy: CSSProperties = {
    fontSize: "13px",
    width: "150px",
    marginLeft: "60px"
}


const TicketsListComponents: React.FC<ListProps> = ({children, className }) => {
    
  return (
    <div>
        <div style={TitleContainer}>
            <p style={fieldOfName}>Title</p>
            <p style={fieldOfDescription}>Description</p>
            <p style={fieldCreatedBy}>Created By</p>
        </div>
        <div
            className={className}
        >
        {children}
        </div>
    </div>
  );
};

export default TicketsListComponents;