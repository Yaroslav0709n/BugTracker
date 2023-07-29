import React, { CSSProperties } from 'react';

interface SelectProps {
  onChange: React.ChangeEventHandler<HTMLSelectElement> | undefined;
  onFocus: React.FocusEventHandler<HTMLSelectElement> | undefined;
  className?: string;
  name: string | undefined;
  id: string | undefined;
  value: string | number | readonly string[] | undefined;
  style?: CSSProperties; 
}

const selectInput = {
    width: "100%",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "10px"
}

const SelectOptions: React.FC<SelectProps> = ({onChange, onFocus, name, id, value, className}) => {
  return (
    <select
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          className={className}
          style={selectInput}
          >
            <option value="">Select Role</option>
            <option value="Project Manager">Project Manager</option>
            <option value="Developer">Developer</option>
        </select>
  );
};

export default SelectOptions;