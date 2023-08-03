import React, { CSSProperties } from 'react';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  style?: CSSProperties; 
  className?: string;
}

const controlButton:CSSProperties = {
    position: "absolute",
    transition: '0.3s',
    border: 'none',
    borderRadius: '4px',
    height: '30px',
    color: 'white'
}; 


const SaveCancelUsersButtons: React.FC<ButtonProps> = ({children, onClick, style, className}) => {
    const buttonStyle = { ...controlButton, ...style };

    return (
        <button className={className} style={buttonStyle} type="submit" onClick={onClick}>
          {children}
        </button>
  );
};

export default SaveCancelUsersButtons;