import React from "react";
import Typography from "@material-ui/core/Typography";
import { PrimaryButton } from "../Components";
import { useProject } from "../Storage";
import { Project, Bucket } from "../Types";
import AddProjectForm from "./AddProjectForm";
import BucketList from "./BucketList";
import AddBucketForm from "./AddBucketForm";
import { createRikaTillsammansBuckets } from "./Buckets";
import styled from "styled-components";

const Container = styled.div``;

const StartPage = () => {
  const [project, saveProject] = useProject();
  const [projectFormOpen, setProjectFormOpen] = React.useState(false);
  const [bucketFormOpen, setBucketFormOpen] = React.useState(false);
  const showHideProjectForm = () => setProjectFormOpen((state) => !state);
  const showHideBucketForm = () => setBucketFormOpen((state) => !state);
  const projectSaved = (newProject: Project) => {
    newProject.buckets = createRikaTillsammansBuckets(
      newProject.necessaryExpenses
    );
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
  const updateBuckets = (newBuckets: Bucket[]) => {
    if (project) {
      project.buckets = newBuckets;
      saveProject(project);
    }
  };
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
      <Container>
        <Typography variant="h4">{project.name}</Typography>
        <Typography variant="body1">{project.description}</Typography>
        <BucketList
          buckets={project.buckets}
          onCreateBucketClick={showHideBucketForm}
          onBucketsUpdated={updateBuckets}
        />
        <AddBucketForm
          onSave={addBucket}
          onClose={showHideBucketForm}
          isOpen={bucketFormOpen}
        />
      </Container>
    );
  }
};

export default StartPage;
