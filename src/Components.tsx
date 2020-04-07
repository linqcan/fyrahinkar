import React from "react";
import Button, { ButtonProps } from "@material-ui/core/Button";

export const PrimaryButton = (props: ButtonProps) => (
  <Button variant="contained" color="primary" {...props} />
);

export const SecondaryButton = (props: ButtonProps) => (
  <Button variant="contained" color="secondary" {...props} />
);
