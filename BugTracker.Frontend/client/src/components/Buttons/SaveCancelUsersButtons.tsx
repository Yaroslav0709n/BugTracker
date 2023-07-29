import React, { CSSProperties } from 'react';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  style?: CSSProperties; 
}

const controlButton:CSSProperties = {
    position: "absolute",
};


const SaveCancelUsersButtons: React.FC<ButtonProps> = ({children, onClick, style}) => {
    const buttonStyle = { ...controlButton, ...style };

    return (
        <button style={buttonStyle} type="submit" onClick={onClick}>
          {children}
        </button>
  );
};

export default SaveCancelUsersButtons;