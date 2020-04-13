import { Project, Application, Bucket } from "./Types";

export const getProject = (): Project | undefined => {
  const savedProject = localStorage.getItem("project");
  if (!savedProject) {
    return undefined;
  } else {
    const project: Project = JSON.parse(savedProject);
    return project;
  }
};

export const saveProject = (project: Project | undefined) => {
  if (project) {
    console.log("Saving ", project);
    localStorage.setItem("project", JSON.stringify(project));
  }
};

type ApplicationAction =
  | {
      type: "addProject";
      project: Project;
    }
  | {
      type: "removeProject";
    }
  | {
      type: "addBucket";
      bucket: Bucket;
    }
  | {
      type: "addBuckets";
      buckets: Bucket[];
    }
  | {
      type: "updateBucket";
      bucket: Bucket;
    }
  | {
      type: "removeBucket";
      bucketId: number;
    };

export const applicationReducer = (
  state: Application,
  action: ApplicationAction
): Application => {
  switch (action.type) {
    case "addProject": {
      return { ...state, project: action.project };
    }
    case "removeProject": {
      return { ...state, project: undefined };
    }
    case "addBucket": {
      if (!state.project) {
        return state;
      }
      const newBuckets = [...state.project.buckets];
      const newState = { ...state };
      if (newState.project) {
        newState.project.buckets = newBuckets;
      }
      return newState;
    }
    case "addBuckets": {
      const newState = { ...state };
      if (newState.project) {
        newState.project.buckets = action.buckets;
      }
      return newState;
    }
    case "updateBucket": {
      if (!state.project) {
        return state;
      }
      const newBuckets = state.project.buckets.map((b) =>
        b.id === action.bucket.id ? action.bucket : b
      );
      const newState = { ...state };
      if (newState.project) {
        newState.project.buckets = newBuckets;
      }
      return newState;
    }
    case "removeBucket": {
      const newState = { ...state };
      if (newState.project && state.project) {
        newState.project.buckets = state.project.buckets.filter(
          (b) => b.id !== action.bucketId
        );
      }
      return newState;
    }
    default:
      return state;
  }
};
