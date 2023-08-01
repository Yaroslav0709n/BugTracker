import React, { CSSProperties } from 'react';

interface InputProps {
  onClick: React.MouseEventHandler<HTMLInputElement>;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
  className?: string;
  name: string | undefined;
  value: string | number | readonly string[] | undefined;
  style?: CSSProperties; 
}

const updateInput = {
  fontSize: "13px",
  width: "150px", 
  height: '40px'
}

const UpdateInput: React.FC<InputProps> = ({ onClick, onChange, onFocus, name, value, className, style}) => {
  const mergedStyle = { ...updateInput, ...style };

  return (
    <input
        style={mergedStyle}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus} 
        className={className}
        onClick={onClick}
        autoComplete="off"
    />
  );
};

export default UpdateInput;