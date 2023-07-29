import React,{ CSSProperties } from 'react';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  children: React.ReactNode;
  style?: CSSProperties
}

const controlButtonStyles:CSSProperties = {
  height: "45px",
  width: "50px",
  padding: "5pxy",
  marginLeft: "20px",
  transition: '0.3s',
  color: '#fff',
  border: 'none',
  borderRadius: '4px', 
  fontSize: '12px',
  cursor: 'pointer',
};

const ControlButton: React.FC<ButtonProps> = ({ onClick, className, children, style }) => {
  return (
    <button
      className={`${className}`}
      style={{ ...controlButtonStyles, ...style }}
      onClick={onClick} 
    >
      {children}
    </button>
  );
};

export default ControlButton;