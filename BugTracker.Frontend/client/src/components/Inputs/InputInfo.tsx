import React from 'react';

interface InputProps {
    children: React.ReactNode;
    className?: string;
}

const modalTitle = {
    fontSize: "16px",
    marginBottom: "10px"
}

const InputInfo: React.FC<InputProps> = ({ children, className }) => {
    return (
        <div>
            <label
                style={modalTitle}
                className={className}
            >
                {children}
            </label>
        </div>
    );
};

export default InputInfo;