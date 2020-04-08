import React from "react";
import { PrimaryButton } from "../Components";
import { Bucket } from "../Types";
import BucketView from "./BucketView";

type BucketListProps = {
  buckets: Bucket[];
  onCreateBucketClick: () => void;
  onBucketsUpdated: (buckets: Bucket[]) => void;
};

const BucketList = ({
  buckets,
  onCreateBucketClick,
  onBucketsUpdated,
}: BucketListProps): JSX.Element => {
  const onBucketUpdated = (bucket: Bucket) => {
    const newBuckets = buckets.map((b) => (b.id === bucket.id ? bucket : b));
    onBucketsUpdated(newBuckets);
  };
  return (
    <div>
      {buckets.length === 0 ? (
        <PrimaryButton onClick={onCreateBucketClick}>
          Skapa din första hink
        </PrimaryButton>
      ) : (
        <div>
          {buckets.map((bucket, i) => (
            <BucketView
              onBucketUpdated={onBucketUpdated}
              key={i}
              bucket={bucket}
            />
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
