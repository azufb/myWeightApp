import { useForm, Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';

// react-datepicker用CSS
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ja', ja);

const RecordingForm = () => {
  const { register, handleSubmit, reset, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);

    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name='date'
        control={control}
        render={({ field: { onChange, value } }) => (
          <DatePicker selected={value} onChange={onChange} locale={ja} />
        )}
      />
      <label htmlFor='weight'>Weight: </label>
      <input id='weight' {...register('weight')} />

      <input type='submit' />
    </form>
  );
};

export default RecordingForm;
