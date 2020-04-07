import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";
import TextField, { TextFieldProps } from "@material-ui/core/TextField";

export const PrimaryButton = (props: ButtonProps) => (
  <Button variant="contained" color="primary" {...props} />
);

export const SecondaryButton = (props: ButtonProps) => (
  <Button variant="contained" color="secondary" {...props} />
);

type FilledTextFieldProps = {
  fullWidth?: boolean;
} & TextFieldProps;

export const FilledTextField = (props: FilledTextFieldProps): JSX.Element => (
  <TextField {...props} fullWidth={props.fullWidth} variant="standard" />
);

FilledTextField.defaultProps = {
  fullWidth: true,
};
