import { QueryClient, useQueryClient } from '@tanstack/react-query';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { GetResultDataType } from '../../types/GetResultDataType';
import styles from './style/style.module.scss';

const Graph = () => {
  // React Queryでキャッシュしたデータを取得
  const queryClient: QueryClient = useQueryClient();
  const queryData: GetResultDataType | undefined = queryClient.getQueryData([
    'data',
  ]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>グラフ</h2>
      <div className={styles.graph}>
        <LineChart width={900} height={300} data={queryData?.Items}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey='date'
            interval={0}
            angle={-16}
            dx={-20}
            dy={8}
            tick={{
              fontSize: 10,
            }}
          />
          <YAxis dataKey='weight' />
          {/*<YAxis yAxisId={2} dataKey='bmi' orientation='right' />*/}
          <Tooltip />
          <Line type='monotone' strokeWidth={2} dataKey='weight' />
          {/*<Line yAxisId={2} type='monotone' dataKey='bmi' />*/}
        </LineChart>
      </div>
      <p className={styles.annotation}>※X軸スクロールできます。</p>
    </div>
  );
};

export default Graph;
