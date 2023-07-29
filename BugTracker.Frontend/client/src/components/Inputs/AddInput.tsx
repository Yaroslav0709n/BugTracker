import React, { CSSProperties } from 'react';

interface InputProps {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onFocus: React.FocusEventHandler<HTMLInputElement> | undefined;
  className?: string;
  name: string | undefined;
  id: string | undefined;
  value: string | number | readonly string[] | undefined;
  style?: CSSProperties; 
  type: React.HTMLInputTypeAttribute | undefined;
  placeholder?:string;
}

const addInput = {
    width: "95%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px",
}

const AddInput: React.FC<InputProps> = ({onChange, onFocus, name, id, value, className, type, placeholder}) => {
  return (
    <input
        id={id}
        style={addInput}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        className={className}
        placeholder={placeholder}
    />
  );
};

export default AddInput;