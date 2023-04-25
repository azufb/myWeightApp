import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import { format } from 'date-fns';
import putCommandFunc from '../../aws/putCommandFunc';

// react-datepicker用CSS
import 'react-datepicker/dist/react-datepicker.css';
import scanItemsFunc from '../../aws/scanItemsFunc';
import { useRecoilState } from 'recoil';
import { dynamoDbItemCountAtom } from '../../recoil/atom';

// DatePicker用にロケーションをjaにセット
registerLocale('ja', ja);

const RecordingForm = () => {
  const [itemCount, setItemCount] = useRecoilState(dynamoDbItemCountAtom);
  const { register, handleSubmit, reset, control } = useForm();

  useEffect(() => {
    const getTableInfo = async () => {
      const data = await scanItemsFunc();
      console.log(data);

      if (data?.Count !== undefined) {
        setItemCount(data?.Count);
      }
    };

    getTableInfo();
  }, []);

  const onSubmit = async (data: any) => {
    // idを現在のアイテム数に応じて対応
    const id: number = itemCount === 0 ? 1 : itemCount + 1;

    // 日付フォーマット
    const date: Date = new Date(data.date);
    const dataYear: number = date.getFullYear();
    const dataMonth: number = date.getMonth();
    const dataDate: number = date.getDate();
    const formattedDate: string = format(
      new Date(dataYear, dataMonth, dataDate),
      'yyyy/MM/dd'
    );

    // 体重
    const weightFloat: number = parseFloat(data.weight);

    // BMI計算(小数第2位まで表示)
    const bmi: number = Math.round((weightFloat / 2.365444) * 100) / 100;

    // DynamoDBへ登録するために渡すオブジェクト
    const formData = {
      id: id,
      date: formattedDate,
      weight: weightFloat,
      bmi: bmi,
    };

    // DynamoDBへ登録する関数実行
    const result = await putCommandFunc(formData);
    console.log(result);

    // フォームリセット
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
