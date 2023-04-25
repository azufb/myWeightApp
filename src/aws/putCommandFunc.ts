import { PutCommand, PutCommandOutput } from '@aws-sdk/lib-dynamodb';
import { ddbDocClient } from './ddbDocClient';

const putCommandFunc = async (formData: any) => {
  const params = {
    TableName: 'myWeightApp',
    Item: {
      id: 1,
      date: formData.date,
      weight: formData.weight,
      bmi: formData.bmi,
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
