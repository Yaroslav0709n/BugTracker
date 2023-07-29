import axios from 'axios';
import { AxiosRequestConfig } from 'axios';
import {ProjectDto} from '../../../interface/Projects'
import getToken from '../../../common/getToken'

const updateProject = async (editingProjectId: string, newProject: ProjectDto) => {
  try {
    const config: AxiosRequestConfig = {
      url: `https://localhost:7088/api/Project?projectId=${editingProjectId}`,
      method: 'PUT',
      headers: getToken(),
      data: {
        name: newProject.name,
        description: newProject.description,
      },
    };

    await axios(config);
    return { updatedName: newProject.name, updatedDescription: newProject.description };
  } catch (error) {
    throw error; 
  }
};

export default updateProject;