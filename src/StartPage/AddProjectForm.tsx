import React from "react";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { Project, Currency } from "../Types";
import { FilledTextField } from "../Components";

type AddProjectFormProps = {
  onClose: () => void;
  onSave: (project: Project) => void;
  isOpen: boolean;
};

const AddProjectForm = ({ onClose, isOpen, onSave }: AddProjectFormProps) => {
  const nameField = React.useRef<HTMLInputElement>(null);
  const descField = React.useRef<HTMLInputElement>(null);
  const expensesField = React.useRef<HTMLInputElement>(null);
  const saveProject = () => {
    const project: Project = {
      name: "",
      description: "",
      currency: Currency.SEK,
      necessaryExpenses: 0,
      buckets: [],
    };
    if (nameField && nameField.current !== null) {
      project.name = nameField.current.value;
    }
    if (descField && descField.current !== null) {
      project.description = descField.current.value;
    }
    if (expensesField && expensesField.current !== null) {
      try {
        project.necessaryExpenses = Number(expensesField.current.value);
      } catch {
        //Raise error somehow
      }
    }
    onSave(project);
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Skapa ett nytt sparprojekt</DialogTitle>
      <DialogContent>
        <form>
          <FilledTextField
            id="project-name"
            inputRef={nameField}
            label="Namn"
            required
          />
          <FilledTextField
            id="project-description"
            inputRef={descField}
            label="Beskrivning"
            multiline
          />
          <FilledTextField
            id="project-necessaryexpenses"
            inputRef={expensesField}
            label="Nödvändinga utgifter"
            helperText="1års utgifter minus garanterad inkomster (inkomstförsäkring, uppsägningstid)"
            InputProps={{
              endAdornment: <InputAdornment position="end">kr</InputAdornment>,
            }}
            required
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Avbryt
        </Button>
        <Button variant="text" onClick={saveProject}>
          Spara
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectForm;
