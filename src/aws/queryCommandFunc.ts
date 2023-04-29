import { QueryCommand, QueryCommandInput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './ddbDocClient';

const queryCommandFunc = async () => {
  const param: QueryCommandInput = {
    TableName: 'myWeightData',
    ScanIndexForward: true,
  };

  try {
    const data = await ddbDocClient.send(new QueryCommand(param));
    return data;
  } catch (err) {
    console.log('err', err);
  }
};

export default queryCommandFunc;
