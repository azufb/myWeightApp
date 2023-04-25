import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const REGION = process.env.REACT_APP_REGION;

const ddbClient = new DynamoDBClient({ region: REGION });
export { ddbClient };
