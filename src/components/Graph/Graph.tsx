import { useQueryClient } from '@tanstack/react-query';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

const Graph = () => {
  // React Queryでキャッシュしたデータを取得
  const queryClient = useQueryClient();
  const queryData: any = queryClient.getQueryData(['data']);

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
        <YAxis dataKey='weight' />
        <Tooltip />
        <Line type='monotone' dataKey='weight' />
      </LineChart>
    </div>
  );
};

export default Graph;
