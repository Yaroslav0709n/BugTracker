import React, { useState } from 'react';
import { Project } from '../../interface/Projects';

interface InputProps {
  lists: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

const searchInput = {
  width: '20%',
  padding: '10px',
  border: '1px solid black',
  borderRadius: '6px',
  marginBottom: '10px',
  marginLeft: '725px'
};

const SearchInput: React.FC<InputProps> = ({
  lists,
  setFilteredProjects,

}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  React.useEffect(() => {
    setFilteredProjects(
      lists.filter((list) =>
        list.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        list.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, lists]);

  return (
    <input
      type="text"
      value={searchQuery}
      onChange={handleSearch}
      style={searchInput}
      placeholder='Search project ...'
    />
  );
};

export default SearchInput;