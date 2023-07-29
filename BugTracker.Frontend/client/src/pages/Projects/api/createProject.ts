import axios, { AxiosRequestConfig } from 'axios';
import getToken from '../../../common/getToken';
import { ProjectDto } from '../../../interface/Projects';
import handleError from '../error/errorHandler';

export const createProject = async (
    newProject: ProjectDto, 
    selectedUsers: {[key: string]: boolean;}, 
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, 
    setError: React.Dispatch<React.SetStateAction<{
        [key: string]: string; 
    }>>) => {
  try {
    setIsLoading(true);
    const requestData = {
      name: newProject.name,
      description: newProject.description,
    };

    const config = {
      url: 'https://localhost:7088/api/Project',
      method: 'POST',
      headers: getToken(),
      data: requestData,
    };

    await axios(config);
    setIsLoading(false);
    window.location.reload();
    const config2: AxiosRequestConfig = {
      url: 'https://localhost:7088/api/Project',
      method: 'GET',
      headers: getToken(),
    };

    const response2 = await axios(config2);

    const userProjects = response2.data.$values;

    const latestProjectId = userProjects[userProjects.length - 1].id;

    await handleAddUsersToProject(latestProjectId, selectedUsers);

  } catch (error: any) {
    setIsLoading(false);
    handleError(error, setError);
  }
};

export const handleAddUsersToProject = async (projectId: string, selectedUsers: {[key: string]: boolean;}) => {
  try {
    for (const userId of Object.keys(selectedUsers)) {
      if (selectedUsers[userId]) {
        await addUserToProject(userId, projectId);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const addUserToProject = async (userId: string, projectId: string) => {
  try {
    const config: AxiosRequestConfig = {
      url: `https://localhost:7088/api/ProjectUser?userId=${userId}&projectId=${projectId}`,
      method: 'POST',
      headers: getToken(),
    };

    const response = await axios(config);
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
};