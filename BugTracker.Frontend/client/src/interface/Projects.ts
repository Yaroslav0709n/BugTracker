export interface Project {
    $id?: string;
    id?: string;
    name: string;
    description: string;
    createTime: string;
    updateTime: string;
}

export interface ProjectDto {
    name: string;
    description: string;
    createTime: string;
    updateTime: string;
  }