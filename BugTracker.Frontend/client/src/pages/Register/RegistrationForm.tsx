import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../assets/componentsstyle/registration.module.css';
import errorStyles from '../../assets/componentsstyle/errorstyle.module.css';
import { RegisterDto } from '../../interface/Auth';
import AddInput from '../../components/Inputs/AddInput';
import InputInfo from '../../components/Inputs/InputInfo';
import SelectOptions from '../../components/SelectOptions'
import handleError from './error/errorHandler';
import AuthButton from '../../components/Buttons/AuthButton';


const RegistrationForm: React.FC = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState<RegisterDto>({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
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

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
      const response = await axios.post('https://localhost:7088/api/Auth/register', formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        role: '',
        password: '',
      });
      setError({});
      console.log(response.data);
      navigate('/login')

    }  catch (error: any) {
       handleError(error, setError);
    }
  };



  return (
    <form className={styles.formContainer}>
      <h2 style={{textAlign: "center"}}>Sign Up</h2>
      <div>
        <InputInfo className={`${error.firstName && errorStyles.errorLabel}`}>
          First name:
        </InputInfo>
        {error.firstName && (<div className={errorStyles.error}>{error.firstName}</div>)}
        <AddInput
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          onFocus={() => setError((prevError) => ({ ...prevError, firstName: '' }))}
          className={`${error.firstName && errorStyles.errorInput}`}
        />
      </div>
      <div>
        <InputInfo className={`${error.lastName && errorStyles.errorLabel}`}>
          Last name:
        </InputInfo>
        {error.lastName && (<div className={errorStyles.error}>{error.lastName}</div>)}
        <AddInput
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          onFocus={() => setError((prevError) => ({ ...prevError, lastName: '' }))}
          className={` ${error.lastName && errorStyles.errorInput}`}
        />
      </div>
      <div>
        <InputInfo className={`${error.email && errorStyles.errorLabel}`}>
          Email:
        </InputInfo>
        {error.email && (<div className={errorStyles.error}>{error.email}</div>)}
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
      <InputInfo className={`${error.role && errorStyles.errorLabel}`}>
        Role:
      </InputInfo>
      {error.role && (<div className={errorStyles.error}>{error.role}</div>)}
        <SelectOptions
          id="role"
          name="role"
          value={formData.role}
          onChange={handleSelectChange}
          onFocus={() => setError((prevError) => ({ ...prevError, role: '' }))}
          className={`${error.role && errorStyles.errorInput}`}
        />
      </div>
      <div>
        <InputInfo className={`${error.password && errorStyles.errorLabel}`}>
          Password:
        </InputInfo>
        {error.password && (<div className={errorStyles.error}>{error.password}</div>)}
        <AddInput
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => setError((prevError) => ({ ...prevError, password: '' }))}
          className={`${error.password && errorStyles.errorInput}`}
        />
      </div>
      <AuthButton style={{width: "100%"}} onClick={(e:any) => handleSubmit(e)}>Sign Up</AuthButton>
      <div className={styles.linkContainer}>
        <Link to="/login">I have an account</Link>
      </div>
    </form>
  );
};

export default RegistrationForm;