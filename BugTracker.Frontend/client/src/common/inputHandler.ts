import { ChangeEvent } from 'react';

const handleInputChange = (e: ChangeEvent<HTMLInputElement>, setNewValue: React.Dispatch<React.SetStateAction<any>>) => {
  const { name, value } = e.target;
  setNewValue((prevProject: any) => ({
    ...prevProject,
    [name]: value,
  }));
};

export default handleInputChange;