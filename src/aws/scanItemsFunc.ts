import { ScanCommand, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './ddbDocClient';

const scanItemsFunc = async () => {
  const param = {
    TableName: 'myWeightApp',
  };

  try {
    const data: ScanCommandOutput = await ddbDocClient.send(
      new ScanCommand(param)
    );
    console.log(data);
    return data;
  } catch (err) {
    console.log('err', err);
  }
};

export default scanItemsFunc;
