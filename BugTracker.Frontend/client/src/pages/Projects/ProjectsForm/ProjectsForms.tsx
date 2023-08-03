import React, { useEffect, useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import btnStyles from '../../../assets/componentsstyle/buttonstyle.module.css';
import listStyles from '../../../assets/componentsstyle/liststyle.module.css';
import errorStyles from '../../../assets/componentsstyle/errorstyle.module.css';
import {deleteProject} from '../api/deleteProject';
import updateProject from '../api/updateProject';
import handleError from '../error/errorHandler';
import handleInputChange from '../../../common/inputHandler';
import jwt_decode from 'jwt-decode';
import CreateProjectModal from '../../../components/CreateProjectModal';
import { useNavigate } from 'react-router';
import ControlButton from '../../../components/Buttons/ControlButton';
import AddButton from '../../../components/Buttons/AddButton';
import ItemListComponents from '../../../components/ListComponents/ItemListComponents'
import UpdateInput from '../../../components/Inputs/UpdateInput';
import Time from '../../../components/Time';
import {Project, ProjectDto} from '../../../interface/Projects'
import ProjectListComponents from '../../../components/ListComponents/ProjectTicketListComponents';
import SearchInput from '../../../components/Inputs/SearchInput';


const ProjectsForm: React.FC = () => {
  const [newProject, setNewProject] = useState<ProjectDto>({
    name: '',
    description: '',
    createTime: '',
    updateTime: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]); 
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]); 
  const [userRole, setUserRole] = useState<string>('');

  const token = localStorage.getItem('accessToken');
  const headers: AxiosRequestConfig['headers'] = {
    Authorization: `Bearer ${token}`, 
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (token) {
          const decodedToken: any = jwt_decode(token);
          const role = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
          setUserRole(role);
        }
        const config: AxiosRequestConfig = {
          url: `https://localhost:7088/api/Project`,
          method: 'GET',
          headers,
        }; 

        const response = await axios(config);
        const projectData = response.data;
        console.log(projectData);
        setProjects(projectData.$values);
      } catch (error: any) {
        console.log(error.response);
      }
    };

    fetchProjects();
  }, []);

  const handleEditProject = (projectId: string) => {
    const project = projects.find((project) => project.id === projectId);
    if (project) {
      setEditingProjectId(projectId);
      setIsEditing(true);
      setNewProject({
        name: project.name,
        description: project.description,
        createTime: project.createTime,
        updateTime: project.updateTime,
      });
    }
  };
  
  const handleUpdateProject = async () => {
    try {
      const updatedData = await updateProject(editingProjectId, newProject);

      const updatedProjects = projects.map((project) => {
        if (project.id === editingProjectId) {
          return {
            ...project,
            name: updatedData.updatedName,
            description: updatedData.updatedDescription,
          };
        }
        return project;
      });

      setProjects(updatedProjects);
      setIsEditing(false);
      window.location.reload();
      setEditingProjectId('');
      setNewProject({
        name: '',
        description: '',
        createTime: '',
        updateTime: '',
      });
    } catch (error: any) {
      handleError(error, setError)   
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingProjectId('');
    setNewProject({ 
      name: '',
      description: '',
      createTime: '',
      updateTime: '',
    });
  };

  return (
    <div style={{
                marginLeft: "260px",
      }}>
      <h1>Projects</h1>
      {userRole === 'Project Manager' && (
        <AddButton 
            onClick={() => setIsModalOpen(true)}>
          Add Project 
        </AddButton>
      )}  
      <SearchInput
        lists={projects}
        setFilteredProjects={setFilteredProjects}
      />
      <ProjectListComponents className={listStyles.listStyles}>
      {filteredProjects.map((project) => (
        <ItemListComponents
          key={project.$id}
          onClick={() => project.id && navigate(`/tickets/${project.id}`)}
          >
          {isEditing && project.id === editingProjectId ? (
            <>
              <UpdateInput
                name="name"
                value={newProject.name}
                onChange={(e) => handleInputChange(e, setNewProject)}
                onFocus={() => setError((prevError) => ({ ...prevError, name: '' }))}
                className={`${error.name && errorStyles.errorInput}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{
                  fontWeight: "bold",
                }}
              />
              <UpdateInput
                name="description"
                value={newProject.description}
                onChange={(e) => handleInputChange(e, setNewProject)}
                onFocus={() => setError((prevError) => ({ ...prevError, description: '' }))}
                className={`${error.description && errorStyles.errorInput}`}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                style={{
                  marginLeft: "40px",
                  marginRight: "255px"
                }}
              /> 
              <Time item={project}/>
              <ControlButton 
                className={btnStyles.updateButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateProject();
                }}
              >
                Update
              </ControlButton>
              <ControlButton
                className={btnStyles.cancelEditButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleCancelEdit();
                }}
              >
                Cancel
              </ControlButton> 
            </>
          ) : (
            <>
              <h2 style={{  
                          fontSize: "13px",
                          fontWeight: "bold",
                          width: "150px",
                          wordBreak: "break-word",
                          marginRight: "10px"
                        }}>
                    {project.name}
              </h2>
              <p style={{  
                          fontSize: "13px",
                          width: "450px",
                          wordBreak: "break-word"
                        }}>
                    {project.description}
              </p>
              <Time item={project}/>
              {userRole === 'Project Manager' && (
                <div>
                  <ControlButton
                    className={btnStyles.updateButton} 
                    onClick={(e) => {
                      e.stopPropagation();
                      project.id && handleEditProject(project.id);
                    }}
                  >
                    Edit
                  </ControlButton>
                  <ControlButton
                    className={btnStyles.deleteButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      project.id && deleteProject(project.id);
                    }}
                  >
                    Delete
                </ControlButton>
                </div>
              )}
            </>
          )}
        </ItemListComponents>
      ))}
      </ProjectListComponents>

      <CreateProjectModal
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        newProject={newProject}
        setNewProject={setNewProject}
      />
    </div>
  );
};

export default ProjectsForm;