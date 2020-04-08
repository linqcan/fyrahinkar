export type BucketContent = {
  id: number;
  name: string;
  description: string;
  amount: number;
};

export type Horizon = {
  from: number;
  to: number;
};

export type Bucket = {
  id: number;
  name: string;
  description: string;
  wantedAmount: number;
  horizon: Horizon;
  contents: BucketContent[];
};

export enum Currency {
  SEK = "kr",
  USD = "USD",
}

export type Project = {
  name: string;
  description: string;
  currency: Currency;
  necessaryExpenses: number;
  buckets: Bucket[];
};
