import React from "react";
import Button from "@material-ui/core/Button";

export const PrimaryButton = (props: any) => (
  <Button variant="contained" color="primary" {...props} />
);

export const SecondaryButton = (props: any) => (
  <Button variant="contained" color="secondary" {...props} />
);
