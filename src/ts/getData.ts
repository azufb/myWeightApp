import axiosInstance from '../axios/axiosInstance';
import { AxiosResponse } from 'axios';
import { GetResultDataType } from '../types/GetResultDataType';

const getData = async (): Promise<GetResultDataType> => {
  const result: AxiosResponse = await axiosInstance.get('/dynamoDB/getItems');
  const resultData: GetResultDataType = result.data;
  return resultData;
};

export default getData;
