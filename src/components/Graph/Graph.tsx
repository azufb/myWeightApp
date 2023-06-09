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

const Graph = (): JSX.Element => {
  // React Queryでキャッシュしたデータを取得
  const queryClient: QueryClient = useQueryClient();
  const queryKey: string[] = ['data'];
  const queryData: GetResultDataType | undefined =
    queryClient.getQueryData(queryKey);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>グラフ</h2>
      {queryData?.Count === 0 ? (
        <p>データがありません。</p>
      ) : (
        <>
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
              <YAxis dataKey='weight' domain={[30, 50]} />
              <Tooltip />
              <Line type='monotone' strokeWidth={2} dataKey='weight' />
            </LineChart>
          </div>
          <p className={styles.annotation}>※X軸スクロールできます。</p>
        </>
      )}
    </div>
  );
};

export default Graph;
