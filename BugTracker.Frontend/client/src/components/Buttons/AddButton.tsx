import React, { CSSProperties, useState } from 'react';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  children: React.ReactNode;
  style?: CSSProperties; 
}

const buttonStyles = {
  transition: '0.3s',
  color: '#fff',
  border: 'none', 
  borderRadius: '4px', 
  fontSize: '12px',
  cursor: 'pointer',
  marginBottom: "10px",
  padding: "10px 20px",
  backgroundColor: "#007bff",
};

const hoverStyles = {
  backgroundColor: "#0055af",
};

const AddButton: React.FC<ButtonProps> = ({ onClick, children, style }) => {

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const mergedStyles = isHovered ? { ...buttonStyles, ...hoverStyles } : buttonStyles;

  return (
    <button
      style={{...mergedStyles, ...style}}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </button>
  );
};

export default AddButton;