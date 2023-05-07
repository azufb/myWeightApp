import axiosInstance from '../axios/axiosInstance';
import { AxiosResponse } from 'axios';
import { FormDataType } from '../types/FormDataType';

const postData = async (formData: FormDataType): Promise<void> => {
  const result: AxiosResponse = await axiosInstance.post(
    '/dynamoDB/addItem',
    formData
  );
  console.log(result);
};

export default postData;
