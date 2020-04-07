import React from "react";
import Typography from "@material-ui/core/Typography";
import { PrimaryButton } from "../Components";
import { useProject } from "../Storage";
import { Project } from "../Types";
import AddProjectForm from "./AddProjectForm";
import BucketList from "./BucketList";

const StartPage = () => {
  const [project, saveProject] = useProject();
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
  } else {
    return (
      <div>
        <Typography variant="h4">{project.name}</Typography>
        <Typography variant="body1">{project.description}</Typography>
        <BucketList buckets={project.buckets} />
      </div>
    );
  }
};

export default StartPage;
