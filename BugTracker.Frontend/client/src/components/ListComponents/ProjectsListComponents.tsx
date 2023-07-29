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

const fieldOfCreateTime: CSSProperties = {
    fontSize: "13px",
    width: "150px",
}

const fieldOfUpdateTime: CSSProperties = {
    fontSize: "13px",
}

const ProjectListComponents: React.FC<ListProps> = ({children, className }) => {
    
  return ( 
    <div>
        <div style={TitleContainer}>
            <p style={fieldOfName}>Title</p>
            <p style={fieldOfDescription}>Description</p>
            <p style={fieldOfCreateTime}>Create time</p>
            <p style={fieldOfUpdateTime}>Update time</p>
        </div>
        <div
            className={className}
        >
        {children}
        </div>
    </div>
  );
};

export default ProjectListComponents;