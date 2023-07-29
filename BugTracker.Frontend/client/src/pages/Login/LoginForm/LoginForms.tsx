import React, { useContext, useState } from 'react';
import axios from 'axios';
import styles from '../../../assets/componentsstyle/login.module.css';
import errorStyles from '../../../assets/componentsstyle/errorstyle.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../UserContext';
import AddInput from '../../../components/Inputs/AddInput';
import InputInfo from '../../../components/Inputs/InputInfo';
import AuthButton from '../../../components/Buttons/AuthButton';
import { User } from '../../../interface/Users';
import handleError from '../error/errorHandler';


interface LoginDto {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { setUserId } = useContext(UserContext);

  const [formData, setFormData] = useState<LoginDto>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<{ [key: string]: string }>({});


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [name]: '',
    }));
  };
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7088/api/Auth/login', formData);
      setFormData({
        email: '',
        password: '',
      });
      console.log(response.data);
      
      const token = response.data.token.replace(/"/g, '')
      
      localStorage.setItem('accessToken', token);

      const user: User = response.data;
      setUserId(user.id);
      localStorage.setItem('firstName', user.firstName);
      localStorage.setItem('lastName', user.lastName);
      localStorage.setItem('role', user.role);
      localStorage.setItem('email', user.email);
      navigate('/projects')
    } catch (error: any) {
      handleError(error, setError)
    }
  };

  return (
    <form className={styles.loginContainer}>
      <h2>Login</h2>
      <div>
        <InputInfo className={`${error.email ? errorStyles.errorLabel : ''}`}>
          Email:
        </InputInfo>
        {error.email && <div className={errorStyles.error}>{error.email}</div>}
        <AddInput
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          onFocus={() => setError((prevError) => ({ ...prevError, email: '' }))}
          className={`${error.email && errorStyles.errorInput}`}
        />
      </div> 
      <div>
        <InputInfo className={`${error.password ? errorStyles.errorLabel : ''}`}>
          Password:
        </InputInfo>
        {error.password && <div className={errorStyles.error}>{error.password}</div>}
        <AddInput
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => setError((prevError) => ({ ...prevError, password: '' }))}
          className={`${error.password ? errorStyles.errorInput : ''}`}
        />
      </div>
      <AuthButton onClick={(e: any) => handleSubmit(e)}>Login</AuthButton>
      <div className={styles.linkContainer}>
        <Link to="/registration">I don't have an account</Link>
      </div>
    </form>
  );
};

export default LoginForm;

