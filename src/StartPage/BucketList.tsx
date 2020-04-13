import React from "react";
import { PrimaryButton } from "../Components";
import { Bucket } from "../Types";
import BucketView from "./BucketView";
import styled from "styled-components";

const BucketListContainer = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  grid-column-gap: 8px;
  grid-row-gap: 8px;
  margin-bottom: 8px;
`;

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
    onBucketsUpdated(buckets.map((b) => (b.id === bucket.id ? bucket : b)));
  };
  return (
    <div>
      {buckets.length === 0 ? (
        <PrimaryButton onClick={onCreateBucketClick}>
          Skapa din första hink
        </PrimaryButton>
      ) : (
        <React.Fragment>
          <BucketListContainer>
            {buckets.map((bucket, i) => (
              <BucketView
                onBucketUpdated={onBucketUpdated}
                key={i}
                bucket={bucket}
              />
            ))}
          </BucketListContainer>
          <PrimaryButton onClick={onCreateBucketClick}>
            Lägg till en hink
          </PrimaryButton>
        </React.Fragment>
      )}
    </div>
  );
};

export default BucketList;
