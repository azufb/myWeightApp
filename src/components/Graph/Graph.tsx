import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { GetResultDataType } from '../../types/GetResultDataType';

const Graph = () => {
  // React Queryでキャッシュしたデータを取得
  const queryClient: QueryClient = useQueryClient();
  const queryData: GetResultDataType | undefined = queryClient.getQueryData([
    'data',
  ]);

  return (
    <div>
      <LineChart width={400} height={150} data={queryData?.Items}>
        <XAxis
          dataKey='date'
          interval={0}
          angle={-30}
          dx={-10}
          dy={5}
          tick={{
            fontSize: 10,
          }}
          domain={['dataMin', 'dataMax']}
          tickFormatter={(unix) => new Date(unix).toLocaleDateString()}
        />
        <YAxis yAxisId={1} dataKey='weight' />
        {/*<YAxis yAxisId={2} dataKey='bmi' orientation='right' />*/}
        <Tooltip />
        <Line yAxisId={1} type='monotone' dataKey='weight' />
        {/*<Line yAxisId={2} type='monotone' dataKey='bmi' />*/}
      </LineChart>
    </div>
  );
};

export default Graph;
