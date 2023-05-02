import { ScanCommand, ScanCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './ddbDocClient';

const scanItemsFunc = async () => {
  const param = {
    TableName: 'myWeightData',
  };

  try {
    const data: ScanCommandOutput = await ddbDocClient.send(
      new ScanCommand(param)
    );
    // ここで日付順になるようソートする
    data.Items?.sort();
    return data;
  } catch (err) {
    console.log('err', err);
  }
};

export default scanItemsFunc;
