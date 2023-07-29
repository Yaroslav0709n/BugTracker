import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './assets/global.css';

import Header from './pages/Header/HeaderForm';
import Sidebar from './pages/Sidebar/SidebarForm';
import LoginForm from './pages/Login/LoginForm/LoginForms';
import RegisterForm from './pages/Register/RegistrationForm';
import Projects from './pages/Projects/ProjectsForm/ProjectsForms'
import TicketsForm from './pages/Tickets/TicketsForm/TicketsForms'
import UserTickets from './pages/UserTickets/UserTicketsForm/UserTicketForms'
import TicketInfo from './pages/TicketInfo/TicketInfoForm/TicketInfoForms'
import { UserProvider } from './UserContext';

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

const AppRoutes: React.FC = () => {
  const location = useLocation();
  const showHeader = location.pathname !== '/registration' && location.pathname !== '/login' && location.pathname !== '/';

  return (
    <UserProvider>
      <div className='mainContainer'>
        {showHeader && <Header />}
        {showHeader && <Sidebar />}
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/registration" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tickets/:projectId" element={<TicketsForm />} />
          <Route path="/usertickets" element={<UserTickets />} />
          <Route path="/userticket/:projectId/:ticketId" element={<TicketInfo/>} />
        </Routes>
      </div>
    </UserProvider>
  );
};

export default App;