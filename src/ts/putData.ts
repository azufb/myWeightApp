import axiosInstance from '../axios/axiosInstance';

const putData = async (formData: any) => {
  const result = await axiosInstance.post('/addItem', formData);
  console.log(result);
};

export default putData;
