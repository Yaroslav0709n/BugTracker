import React from 'react';
import { Project } from '../../interface/Projects';

interface InputProps {
  projects: Project[];
  setFilteredProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const searchInput = {
  width: '21%',
  padding: '10px',
  border: '1px solid black',
  borderRadius: '6px',
  marginBottom: '10px',
  marginLeft: '725px'
};

const SearchInput: React.FC<InputProps> = ({
  projects,
  setFilteredProjects,
  searchQuery,
  setSearchQuery,
}) => {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  React.useEffect(() => {
    setFilteredProjects(
      projects.filter((project) =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, projects]);

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