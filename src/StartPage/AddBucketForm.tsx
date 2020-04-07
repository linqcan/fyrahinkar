import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import { FilledTextField } from "../Components";
import { Bucket } from "../Types";

type AddBucketFormProps = {
  onClose: () => void;
  onSave: (bucket: Bucket) => void;
  isOpen: boolean;
};

const AddBucketForm = ({ isOpen, onClose, onSave }: AddBucketFormProps) => {
  const nameField = React.useRef<HTMLInputElement>(null);
  const descField = React.useRef<HTMLInputElement>(null);
  const wantedAmountField = React.useRef<HTMLInputElement>(null);
  const horizonFromField = React.useRef<HTMLInputElement>(null);
  const horizonToField = React.useRef<HTMLInputElement>(null);
  const saveBucket = () => {
    onSave({
      name: nameField.current === null ? "" : nameField.current.value,
      description: descField.current === null ? "" : descField.current.value,
      wantedAmount:
        wantedAmountField.current === null
          ? 0
          : Number(wantedAmountField.current.value),
      horizon: {
        from:
          horizonFromField.current === null
            ? 0
            : Number(horizonFromField.current.value),
        to:
          horizonToField.current === null
            ? 0
            : Number(horizonToField.current.value),
      },
      contents: [],
    });
  };
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Skapa en ny hink</DialogTitle>
      <DialogContent>
        <form>
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
              endAdornment: <InputAdornment position="end">Kr</InputAdornment>,
            }}
          />
          <FilledTextField
            fullWidth={false}
            id="bucket-horizon-from"
            inputRef={horizonFromField}
            label="Minsta sparhorizont"
            InputProps={{
              endAdornment: <InputAdornment position="end">År</InputAdornment>,
            }}
          />
          &nbsp;
          <FilledTextField
            fullWidth={false}
            id="bucket-horizon-from"
            inputRef={horizonToField}
            label="Längsta sparhorizont"
            InputProps={{
              endAdornment: <InputAdornment position="end">År</InputAdornment>,
            }}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Avbryt
        </Button>
        <Button variant="text" onClick={saveBucket}>
          Spara
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBucketForm;
