import { useForm, Controller } from 'react-hook-form';
import DatePicker, { registerLocale } from 'react-datepicker';
import ja from 'date-fns/locale/ja';
import { format } from 'date-fns';

// react-datepicker用CSS
import 'react-datepicker/dist/react-datepicker.css';
import {
  useQueryClient,
  useMutation,
  QueryClient,
} from '@tanstack/react-query';
import putData from '../../ts/putData';
import { FormDataType } from '../../types/FormDataType';

import styles from './style/style.module.scss';

// DatePicker用にロケーションをjaにセット
registerLocale('ja', ja);

type FormValuesType = {
  date: Date;
  weight: string;
};

const RecordingForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormValuesType>();

  const queryClient: QueryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: FormDataType) => putData(formData),
    onSettled: () => {
      // データ再フェッチのトリガーとなる
      queryClient.invalidateQueries(['data']);
    },
  });

  const onSubmit = async (data: FormValuesType): Promise<void> => {
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
    const formData: FormDataType = {
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
    <div className={styles.container}>
      <h2 className={styles.title}>フォーム</h2>
      <form>
        <div className={styles.form}>
          <label htmlFor='date' className={styles.formLabel}>
            Date
          </label>
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
                placeholderText='日付を選択してください'
              />
            )}
          />
          {errors.date?.message && (
            <span className={styles.validationErrorText}>
              {errors.date.message}
            </span>
          )}
        </div>

        <div className={styles.form}>
          <label htmlFor='weight' className={styles.formLabel}>
            Weight
          </label>
          <input
            id='weight'
            placeholder='入力してください'
            {...register('weight', {
              required: '入力が必須の項目です。',
              pattern: {
                value: /(\d)?(.)?\d/,
                message: '半角数字で入力して下さい。',
              },
            })}
          />
          <span className={styles.formUnit}>kg</span>
          {errors.weight?.message && (
            <span className={styles.validationErrorText}>
              {errors.weight.message}
            </span>
          )}
        </div>

        <div className={styles.btnArea}>
          <button onClick={handleSubmit(onSubmit)} className={styles.submitBtn}>
            追加する
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecordingForm;
