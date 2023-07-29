import React, { useContext, useEffect, useState } from 'react';
import styles from './header.module.css';
import { UserContext } from '../UserContext';
import { useNavigate } from 'react-router';

const Header: React.FC = () => {
  const { userId } = useContext(UserContext);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
    }
  }, [userId, firstName, lastName]);
  
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  
  return (
    <header>
      <h1 className={styles.logo}>BugTracker</h1>
      <div className={styles.user}>{`${firstName} ${lastName}`}</div>
      <button className={styles.logoutButton} onClick={handleLogout}>
      Logout
    </button>
    </header>
  );
};

export default Header;