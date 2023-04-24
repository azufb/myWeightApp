import { useForm } from 'react-hook-form';

const RecordingForm = () => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='weight'>Weight: </label>
      <input id='weight' {...register('weight')} />

      <input type='submit' />
    </form>
  );
};

export default RecordingForm;
