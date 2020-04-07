import React from "react";
import { PrimaryButton } from "../Components";
import { Bucket } from "../Types";
import { Typography } from "@material-ui/core";

type BucketListProps = {
  buckets: Bucket[];
  onCreateBucketClick: () => void;
};

const BucketList = ({
  buckets,
  onCreateBucketClick,
}: BucketListProps): JSX.Element => {
  return (
    <div>
      {buckets.length === 0 ? (
        <PrimaryButton onClick={onCreateBucketClick}>
          Skapa din första hink
        </PrimaryButton>
      ) : (
        <div>
          {buckets.map((bucket, i) => (
            <Typography variant="h6" key={i}>
              {bucket.name}
            </Typography>
          ))}
          <PrimaryButton onClick={onCreateBucketClick}>
            Lägg till en hink
          </PrimaryButton>
        </div>
      )}
    </div>
  );
};

export default BucketList;
