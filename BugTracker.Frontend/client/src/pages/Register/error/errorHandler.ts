const handleError = (error: any, setError: React.Dispatch<React.SetStateAction<any>>) => {
  if (error?.response?.data?.errors) {
    console.log(error.response)
    const { FirstName, LastName, Email, Role, Password } = error.response.data.errors;
    setError((prevError:any) => ({
      ...prevError,
      firstName: FirstName?.[1] === "'First name' must be filled" ? FirstName[0]
      : FirstName?.[0] === "'First name' must be no longer than 250 characters" 
      ? FirstName[0]
      : '',
      lastName: LastName?.[1] === "'Last name' must be filled" ? LastName[0]
      : LastName?.[0] === "'Last name' must be no longer than 250 characters"
      ? LastName[0]
      : '',
      email: Email?.[2] === "'Email' field is not a valid e-mail address" ? Email[2] : '',
      role: Role?.[0] === "Role is required" ? Role[0] : '',
      password: Password?.[2] === "'Password' must be at least 6 characters long" ? Password[2] : '',
    }));
  }
};

export default handleError;