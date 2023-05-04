import axiosInstance from '../axios/axiosInstance';
import { AxiosResponse } from 'axios';
import { FormDataType } from '../types/FormDataType';

const putData = async (formData: FormDataType): Promise<void> => {
  const result: AxiosResponse = await axiosInstance.post('/addItem', formData);
  console.log(result);
};

export default putData;
