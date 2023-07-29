import React, { CSSProperties } from 'react';
import { User } from '../interface/Users';
import listStyles from '../assets/componentsstyle/liststyle.module.css';

interface CheckBoxProps {
    users: User[];
    selectedUsers: {
        [key: string]: boolean;
    };
    setSelectedUsers: (value: React.SetStateAction<{
        [key: string]: boolean;
    }>) => void;
    style: CSSProperties;
    children: React.ReactNode;
}

const CheckBoxUser: React.FC<CheckBoxProps> = ({ 
    users,
    selectedUsers,
    setSelectedUsers,
    style,
    children
    }) => {

    const handleUserCheckboxChange = (userId: string) => {
        setSelectedUsers((prevSelectedUsers) => ({
            ...prevSelectedUsers,
               [userId]: !prevSelectedUsers[userId],
        })); 
    };
  return (
        <div>
          <h3>{children}</h3>
          <ul style={style} className={listStyles.userList}>
            {users.map((user) => ( 
              <li key={user.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={selectedUsers[user.id] || false}
                    onChange={() => handleUserCheckboxChange(user.id)}
                  /> 
                  {`${user.email} - ${user.role}`}
                </label>
              </li>
            ))}
          </ul>
        </div>
  );
};

export default CheckBoxUser;