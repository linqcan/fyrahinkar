import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FilledTextField, PrimaryButton } from "../Components";
import { Bucket } from "../Types";
import { getInputFieldValue } from "../Utils";

type AddBucketFormProps = {
  onClose: () => void;
  onSave: (bucket: Bucket) => void;
  isOpen: boolean;
};

const AddBucketForm = ({ isOpen, onClose, onSave }: AddBucketFormProps) => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const nameField = React.useRef<HTMLInputElement>(null);
  const descField = React.useRef<HTMLInputElement>(null);
  const wantedAmountField = React.useRef<HTMLInputElement>(null);
  const horizonFromField = React.useRef<HTMLInputElement>(null);
  const horizonToField = React.useRef<HTMLInputElement>(null);
  const saveBucket = () => {
    if (formRef.current?.reportValidity()) {
      onSave({
        id: window.crypto.getRandomValues(new Uint32Array(1))[0],
        name: getInputFieldValue(nameField),
        description: getInputFieldValue(descField),
        wantedAmount: Number(getInputFieldValue(wantedAmountField)),
        horizon: {
          from: Number(getInputFieldValue(horizonFromField)),
          to: Number(getInputFieldValue(horizonToField)),
        },
        contents: [],
      });
    }
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Skapa en ny hink</DialogTitle>
      <DialogContent>
        <form ref={formRef}>
          <FilledTextField
            id="bucket-name"
            inputRef={nameField}
            label="Namn"
            required
          />
          <FilledTextField
            id="bucket-description"
            inputRef={descField}
            label="Beskrivning"
            multiline
          />
          <FilledTextField
            id="buckey-wantedamount"
            inputRef={wantedAmountField}
            label="Storlek på hinken"
            InputProps={{
              endAdornment: <InputAdornment position="end">kr</InputAdornment>,
            }}
            required
          />
          <FilledTextField
            type="number"
            id="bucket-horizon-from"
            inputRef={horizonFromField}
            label="Minsta sparhorizont"
            fullWidth={false}
            InputProps={{
              endAdornment: <InputAdornment position="end">år</InputAdornment>,
            }}
          />
          &nbsp;
          <FilledTextField
            type="number"
            id="bucket-horizon-from"
            inputRef={horizonToField}
            label="Längsta sparhorizont"
            fullWidth={false}
            InputProps={{
              endAdornment: <InputAdornment position="end">år</InputAdornment>,
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Avbryt
        </Button>
        <PrimaryButton onClick={saveBucket}>Skapa</PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddBucketForm;
