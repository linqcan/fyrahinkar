import React from "react";

export const getInputFieldValue = (
  ref: React.RefObject<HTMLInputElement>
): string => (ref.current !== null ? ref.current.value : "");
