import React from "react";
import Card from "@material-ui/core/Card";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import {
  SecondaryTextButton,
  FilledTextField,
  PrimaryTextButton,
} from "../Components";
import { Bucket, BucketContent } from "../Types";

const BucketCard = styled(Card)`
  max-width: 350px;
  padding: 8px;
  margin: 8px;
`;

const AddContentButtons = styled.div`
  text-align: right;
`;

type BucketProps = {
  bucket: Bucket;
  onBucketUpdated: (bucket: Bucket) => void;
};

const BucketView = ({ bucket, onBucketUpdated }: BucketProps) => {
  const [showAddContentField, setShowAddContentField] = React.useState(false);
  const nameField = React.useRef<HTMLInputElement>(null);
  const descField = React.useRef<HTMLInputElement>(null);
  const amountField = React.useRef<HTMLInputElement>(null);
  const toggleAddContentField = () => setShowAddContentField((state) => !state);
  const onSaveClick = () => {
    toggleAddContentField();
    bucket.contents.push({
      id: new Date().getTime(),
      name: getInputFieldValue(nameField),
      description: getInputFieldValue(descField),
      amount: Number(getInputFieldValue(amountField)),
    });
    onBucketUpdated(bucket);
  };
  return (
    <BucketCard>
      <Typography variant="h6">{bucket.name}</Typography>
      <Typography variant="body2">{bucket.description}</Typography>
      <Typography variant="body2">
        Sparhorisont: {bucket.horizon.from}-{bucket.horizon.to}år
      </Typography>
      <Typography variant="body2">
        Storlek (mål):&nbsp;{formatter.format(bucket.wantedAmount)}
      </Typography>
      <Typography variant="body2">
        Storlek (beräknad):&nbsp;
        {formatter.format(sumBucketContents(bucket.contents))}
      </Typography>
      <Table>
        <TableBody>
          {bucket.contents.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{formatter.format(item.amount)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showAddContentField ? (
        <React.Fragment>
          <FilledTextField label="Namn" inputRef={nameField} required />
          <FilledTextField label="Beskrivning" inputRef={descField} />
          &nbsp;
          <FilledTextField label="Summa" inputRef={amountField} required />{" "}
          <AddContentButtons>
            <PrimaryTextButton onClick={toggleAddContentField}>
              Avbryt
            </PrimaryTextButton>{" "}
            <PrimaryTextButton onClick={onSaveClick}>Klar</PrimaryTextButton>{" "}
          </AddContentButtons>
        </React.Fragment>
      ) : null}
      {showAddContentField ? null : (
        <SecondaryTextButton onClick={toggleAddContentField}>
          Lägg till innehåll
        </SecondaryTextButton>
      )}
    </BucketCard>
  );
};

const formatter = new Intl.NumberFormat("se-sv", {
  style: "currency",
  currency: "SEK",
});

const sumBucketContents = (contents: BucketContent[]): number =>
  contents.map((c) => c.amount).reduce((sum, val) => sum + val, 0);

const getInputFieldValue = (ref: React.RefObject<HTMLInputElement>): string =>
  ref.current !== null ? ref.current.value : "";

export default BucketView;
