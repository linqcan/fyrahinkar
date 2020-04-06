import React from "react";
import { getProject } from "../Storage";
import { PrimaryButton } from "../Components";

const BucketList = (): JSX.Element => {
  const project = getProject();
  if (!project) {
    return (
      <div>
        <PrimaryButton>Starta ett sparprojekt</PrimaryButton>{" "}
      </div>
    );
  } else {
    if (project.buckets.length > 0) {
      return <PrimaryButton>Skapa en hink</PrimaryButton>;
    } else {
      return (
        <div>
          {project.buckets.map((bucket) => (
            <p>`${bucket.name}`</p>
          ))}
        </div>
      );
    }
  }
};

export default BucketList;
