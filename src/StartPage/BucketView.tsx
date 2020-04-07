import React from "react";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { SecondaryTextButton } from "../Components";
import { Bucket } from "../Types";

const BucketCard = styled(Card)`
  max-width: 300px;
  padding: 8px;
  margin: 8px;
`;

type BucketProps = {
  bucket: Bucket;
};

const BucketView = ({ bucket }: BucketProps) => {
  return (
    <BucketCard>
      <Typography variant="h6">{bucket.name}</Typography>
      <Typography variant="body2">{bucket.description}</Typography>
      <Typography variant="body2">
        {bucket.horizon.from}-{bucket.horizon.to}år
      </Typography>
      <Table>
        <TableBody>
          {bucket.contents.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.amount}kr</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SecondaryTextButton>Lägg till innehåll</SecondaryTextButton>
    </BucketCard>
  );
};

export default BucketView;
