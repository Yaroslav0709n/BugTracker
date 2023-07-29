import React from 'react';

interface ButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel: () => void;
  isLoading: boolean;
  isUsersFormVisible: boolean;
  setIsUsersFormVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const modalButtons = {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "20px",
}

const controlButton = {
    padding: "8px 16px",
    marginLeft: "10px",
};
const ControlUsersButtons: React.FC<ButtonProps> = ({ 
    onClick, 
    onCancel, 
    isLoading, 
    isUsersFormVisible, 
    setIsUsersFormVisible 
    }) => {

  const toggleUsersFormVisibility = () => {
      setIsUsersFormVisible((prevState:any) => !prevState);
  };

  return (
        <div style={modalButtons}>
            <button style={controlButton} onClick={toggleUsersFormVisibility}>
                {isUsersFormVisible ? "Don't add users" : "Add users"}
            </button>
            <button style={controlButton} type="button" onClick={onClick} disabled={isLoading}>
                Creating
            </button>
            <button style={controlButton} type="button" onClick={onCancel}>
                Cancel
            </button>
        </div>
  );
};

export default ControlUsersButtons;