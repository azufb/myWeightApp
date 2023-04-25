import { PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './ddbDocClient';

const putCommandFunc = async (formData: any) => {
  const params = {
    TableName: 'myWeightApp',
    Item: {
      id: 1,
      date: new Date(),
      weight: 42,
      bmi: 17.7,
    },
  };

  try {
    const data: PutCommandOutput = await ddbDocClient.send(
      new PutCommand(params)
    );
    console.log(data);

    return data;
  } catch (err) {
    console.log('err', err);
  }
};

export default putCommandFunc;
