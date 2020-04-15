import React from "react";
import Typography from "@material-ui/core/Typography";
import { PrimaryButton } from "../Components";
import { applicationReducer, getProject, saveProject } from "../Storage";
import { Project, Bucket, Application } from "../Types";
import AddProjectForm from "./AddProjectForm";
import BucketList from "./BucketList";
import AddBucketForm from "./AddBucketForm";
import { createRikaTillsammansBuckets } from "./Buckets";
import styled from "styled-components";

const Container = styled.div``;

const StartPage = () => {
  const initState: Application = {
    project: getProject(),
  };
  const [application, dispatch] = React.useReducer(
    applicationReducer,
    initState
  );
  const { project } = application;
  if (project) {
  saveProject(project);
  }
  const [projectFormOpen, setProjectFormOpen] = React.useState(false);
  const [bucketFormOpen, setBucketFormOpen] = React.useState(false);
  const showHideProjectForm = () => setProjectFormOpen((state) => !state);
  const showHideBucketForm = () => setBucketFormOpen((state) => !state);
  const projectSaved = (newProject: Project) => {
    newProject.buckets = createRikaTillsammansBuckets(
      newProject.necessaryExpenses
    );
    dispatch({ type: "addProject", project: newProject });
  };
  const addBucket = (bucket: Bucket) => {
    if (project) {
      dispatch({ type: "addBucket", bucket });
      showHideBucketForm();
    }
  };
  const updateBuckets = (buckets: Bucket[]) => {
    if (project) {
      dispatch({ type: "addBuckets", buckets });
    }
  };
  const removeBucket = (bucketId: number) => {
    if (project) {
      dispatch({ type: "removeBucket", bucketId });
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
          onBucketRemove={removeBucket}
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
