import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import React from "react";
import { FilledTextField, PrimaryButton } from "../Components";
import { Currency, Project } from "../Types";
import { getInputFieldValue } from "../Utils";

type AddProjectFormProps = {
  onClose: () => void;
  onSave: (project: Project) => void;
  isOpen: boolean;
};

const AddProjectForm = ({ onClose, isOpen, onSave }: AddProjectFormProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const nameField = React.useRef<HTMLInputElement>(null);
  const descField = React.useRef<HTMLInputElement>(null);
  const expensesField = React.useRef<HTMLInputElement>(null);
  const saveProject = () => {
    if (formRef.current?.reportValidity()) {
      onSave({
        name: getInputFieldValue(nameField),
        description: getInputFieldValue(descField),
        currency: Currency.SEK,
        necessaryExpenses: Number(getInputFieldValue(expensesField)),
        buckets: [],
      });
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Skapa ett nytt sparprojekt</DialogTitle>
      <DialogContent>
        <form ref={formRef}>
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
            type="number"
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
        <PrimaryButton onClick={saveProject}>Skapa</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddProjectForm;
