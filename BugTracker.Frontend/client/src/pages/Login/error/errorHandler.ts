const handleError = (error: any, setError: React.Dispatch<React.SetStateAction<any>>) => {
  if (error.response && error.response.data && error.response.data.errors) {
    const { Email, Password } = error.response.data.errors;
    setError((prevError: any) => ({
      ...prevError,
      email: Email?.[1] === 'The Email field is not a valid e-mail address.' ? Email[1] : '',
      password: Password?.[0] === 'Password is required' ? Password[0] : '',
    }));
  }
  if (error.response.data.error == 'Invalid password') {
    const errorMessage = error.response.data.error;

    setError((prevError: any) => ({
      ...prevError,
      password: errorMessage,
    }));
  }
  else if (error.response.data.error == 'Invalid email'){
    const errorMessage = error.response.data.error;

    setError((prevError: any) => ({
      ...prevError,
      email: errorMessage,
    }));
  }
};
    
export default handleError;