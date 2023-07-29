import React, { useContext, useEffect, useState } from 'react';
import styles from './sidebar.module.css';
import { UserContext } from '../UserContext';

const Sidebar: React.FC = () => {
  const { userId } = useContext(UserContext);
  const [firstName, setFirstName] = useState(localStorage.getItem('firstName') || '');
  const [lastName, setLastName] = useState(localStorage.getItem('lastName') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [email, setEmail] = useState(localStorage.getItem('email') || '');

  useEffect(() => {
    if (userId) {
      localStorage.setItem('firstName', firstName);
      localStorage.setItem('lastName', lastName);
      localStorage.setItem('role', role);
      localStorage.setItem('email', email); 
    }
  }, [userId, firstName, lastName, role, email]);

  return (
    <div className={styles.sidebarContainer}>
      <div className={styles.sidebar}>
        <p className={styles.about}>Fullname:</p>
        <p className={styles.user}>{firstName} {lastName}</p>
        <p className={styles.about}>Role:</p>
        <p className={styles.user}>{role}</p> 
        <p className={styles.about}>Email:</p>
        <p className={styles.user}>{email}</p>
        <br></br>
        <div>
          <p className={styles.menuItem}><a href="/projects">Projects</a></p>
          <p className={styles.menuItem}><a href="/usertickets">Tickets</a></p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;