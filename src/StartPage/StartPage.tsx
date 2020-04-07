import React from "react";
import Typography from "@material-ui/core/Typography";
import { PrimaryButton } from "../Components";
import { useProject } from "../Storage";
import { Project, Bucket } from "../Types";
import AddProjectForm from "./AddProjectForm";
import BucketList from "./BucketList";
import AddBucketForm from "./AddBucketForm";

const StartPage = () => {
  const [project, saveProject] = useProject();
  const [projectFormOpen, setProjectFormOpen] = React.useState(false);
  const [bucketFormOpen, setBucketFormOpen] = React.useState(false);
  const showHideProjectForm = () => setProjectFormOpen((state) => !state);
  const showHideBucketForm = () => setBucketFormOpen((state) => !state);
  const projectSaved = (newProject: Project) => {
    saveProject(newProject);
  };
  const addBucket = (bucket: Bucket) => {
    if (project) {
      project.buckets.push(bucket);
      const saved = saveProject(project);
      if (saved) {
        showHideBucketForm();
      }
    }
  };
  const createBucket = () => showHideBucketForm();
  if (!project) {
    return (
      <div>
        <PrimaryButton onClick={showHideProjectForm}>
          Starta ett sparprojekt
        </PrimaryButton>
        <AddProjectForm
          onSave={projectSaved}
          onClose={showHideProjectForm}
          isOpen={projectFormOpen}
        />
      </div>
    );
  } else {
    return (
      <div>
        <Typography variant="h4">{project.name}</Typography>
        <Typography variant="body1">{project.description}</Typography>
        <BucketList
          buckets={project.buckets}
          onCreateBucketClick={createBucket}
        />
        <AddBucketForm
          onSave={addBucket}
          onClose={showHideBucketForm}
          isOpen={bucketFormOpen}
        />
      </div>
    );
  }
};

export default StartPage;
