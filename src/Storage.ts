import React from "react";
import { Project } from "./Types";

const getProject = (): Project | undefined => {
  const savedProject = localStorage.getItem("project");
  if (!savedProject) {
    return undefined;
  } else {
    const project: Project = JSON.parse(savedProject);
    return project;
  }
};

export const useProject = (): [
  Project | undefined,
  (project: Project) => boolean
] => {
  const [project, setProject] = React.useState<Project>();
  React.useEffect(() => {
    const savedProject = getProject();
    if (project === undefined && savedProject !== undefined) {
      console.log("Found saved project", savedProject);
      setProject(savedProject);
    }
  }, [project]);
  const saveProject = (project: Project): boolean => {
    try {
      console.log("Saving project", project);
      localStorage.setItem("project", JSON.stringify(project));
      setProject(project);
      return true;
    } catch {
      return false;
    }
  };
  return [project, saveProject];
};
