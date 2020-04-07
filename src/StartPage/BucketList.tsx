import React from "react";
import { getProject, saveProject } from "../Storage";
import { PrimaryButton } from "../Components";
import AddProjectForm from "./AddProjectForm";
import { Project } from "../Types";
import Typography from "@material-ui/core/Typography";

const BucketList = (): JSX.Element => {
  const project = getProject();
  const [open, setOpen] = React.useState(false);
  const showHideModal = () => setOpen(!open);
  const projectSaved = (project: Project) => {
    saveProject(project);
  };
  if (!project) {
    return (
      <div>
        <PrimaryButton onClick={showHideModal}>
          Starta ett sparprojekt
        </PrimaryButton>
        <AddProjectForm
          onSave={projectSaved}
          onClose={showHideModal}
          isOpen={open}
        />
      </div>
    );
  }
  return (
    <div>
      <Typography variant="h4">{project.name}</Typography>
      <Typography variant="body1">{project.description}</Typography>
      {project?.buckets.length === 0 ? (
        <PrimaryButton>Skapa en hink</PrimaryButton>
      ) : (
        <div>
          {project.buckets.map((bucket) => (
            <p>`${bucket.name}`</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default BucketList;
