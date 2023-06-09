export type ResultMetadataType = {
  httpStatusCode: number;
  attempts: number;
  requestId: string;
  totalRetryDelay: number;
};

export type ResultItemsType = {
  date: string;
  weight: number;
  timestamp: number;
};

export type GetResultDataType = {
  $metadata: ResultMetadataType;
  Count: number;
  Items: ResultItemsType[];
  ScannedCount: number;
};
