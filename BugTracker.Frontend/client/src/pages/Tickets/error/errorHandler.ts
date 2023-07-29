
const handleError = (error: any, setError: React.Dispatch<React.SetStateAction<any>>) => {
  if (error.response && error.response.data && error.response.data.errors) {
    console.log(error.response)
    const { Title, Description } = error.response.data.errors;
    setError((prevError: any) => ({
      ...prevError,
      name:
      Title?.[0] === "'Title' must be filled" ? Title[0]
        : Title?.[0] === "'Title' must be no longer than 40 characters"
        ? Title[0]
        : '',
      description: 
      Description?.[0] === "'Description' must be filled" ? Description[0]
        : Description?.[0] === "'Description' must be no longer than 250 characters"
        ? Description[0]
        : '',
      }));
    }    
  };
  
  export default handleError;