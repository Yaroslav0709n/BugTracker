
const handleError = (error: any, setError: React.Dispatch<React.SetStateAction<any>>) => {
    if (error.response && error.response.data && error.response.data.errors) {
      console.log(error.response);
      const { Name, Description } = error.response.data.errors;
      setError((prevError: any) => ({
        ...prevError,
        name:
          Name?.[0] === "'Name' must be filled"
            ? Name[0]
            : Name?.[0] === "'Name' must be no longer than 40 characters"
            ? Name[0]
            : '', 
        description:
          Description?.[0] === "'Description' must be filled"
            ? Description[0]
            : Description?.[0] === "'Description' must be no longer than 250 characters"
            ? Description[0]
            : '',
      }));
    }
  };
  
  export default handleError;