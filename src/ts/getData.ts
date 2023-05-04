import axiosInstance from '../axios/axiosInstance';

const getData = async () => {
  const resultData = await axiosInstance.get('/getItems');
  return resultData.data;
};

export default getData;
