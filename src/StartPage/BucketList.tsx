import React from "react";
import { PrimaryButton } from "../Components";
import { Bucket } from "../Types";

type BucketListProps = {
  buckets: Bucket[];
};

const BucketList = ({ buckets }: BucketListProps): JSX.Element => {
  return (
    <div>
      {buckets.length === 0 ? (
        <PrimaryButton>Skapa en hink</PrimaryButton>
      ) : (
        <div>
          {buckets.map((bucket) => (
            <p>`${bucket.name}`</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default BucketList;
