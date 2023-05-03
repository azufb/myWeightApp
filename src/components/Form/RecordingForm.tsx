import { useForm, Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import { format } from 'date-fns';
import putCommandFunc from '../../aws/putCommandFunc';

// react-datepicker用CSS
import 'react-datepicker/dist/react-datepicker.css';
import { useQueryClient, useMutation } from '@tanstack/react-query';

// DatePicker用にロケーションをjaにセット
registerLocale('ja', ja);

type FormValuesType = {
  date: Date;
  weight: string;
};

const RecordingForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValuesType>();

  // React Queryでキャッシュしたデータを取得
  const queryClient = useQueryClient();
  const queryData: any = queryClient.getQueryData(['data']);

  const mutation = useMutation({
    mutationFn: (formData: any) => {
      console.log(formData);
      return fetch('http://localhost:9000/addItem', {
        method: 'POST',
        // リクエストボディを渡すために、JSONであることを伝える必要がある
        // ないと、空のオブジェクトになってしまう
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
    },
    onSettled: () => {
      // データ再フェッチのトリガーとなる
      queryClient.invalidateQueries(['data']);
    },
  });

  const onSubmit = async (data: any) => {
    // idを現在のアイテム数に応じて対応
    const id: number = queryData.Count === 0 ? 1 : queryData.Count + 1;

    // 日付フォーマット
    const date: Date = new Date(data.date);
    const dataYear: number = date.getFullYear();
    const dataMonth: number = date.getMonth();
    const dataDate: number = date.getDate();
    const formattedDate: string = format(
      new Date(dataYear, dataMonth, dataDate),
      'yyyy-MM-dd'
    );

    // 体重
    const weightFloat: number = parseFloat(data.weight);

    // BMI計算(小数第2位まで表示)
    const bmi: number = Math.round((weightFloat / 2.365444) * 100) / 100;

    // DynamoDBへ登録するために渡すオブジェクト
    const formData = {
      date: formattedDate,
      timestamp: date.getTime(),
      weight: weightFloat,
      bmi: bmi,
    };

    // DynamoDBへ登録する関数実行
    mutation.mutate(formData);

    // フォームリセット
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='date'>日付: </label>
      <Controller
        name='date'
        control={control}
        rules={{
          required: '入力が必須の項目です。',
        }}
        render={({ field: { onChange, value } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            locale={ja}
            id='date'
          />
        )}
      />
      {errors.date?.message && <p>{errors.date.message}</p>}

      <label htmlFor='weight'>Weight: </label>
      <input
        id='weight'
        type='number'
        {...register('weight', {
          required: '入力が必須の項目です。',
          pattern: {
            value: /[0-9]/,
            message: '数字で入力して下さい。',
          },
        })}
      />
      <span>kg</span>
      {errors.weight?.message && <p>{errors.weight.message}</p>}

      <input type='submit' />
    </form>
  );
};

export default RecordingForm;
