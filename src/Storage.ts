import { Project } from "./Types";

export const getProject = (): Project | undefined => {
  const savedProject = localStorage.getItem("project");
  if (!savedProject) {
    return undefined;
  } else {
    const project: Project = JSON.parse(savedProject);
    return project;
  }
};

export const saveProject = (project: Project): boolean => {
  try {
    localStorage.setItem("project", JSON.stringify(project));
    return true;
  } catch {
    return false;
  }
};
