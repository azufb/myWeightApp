import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import data from '../../sampleData/sampleData';

const SampleGraph = () => {
  console.log(data);
  console.log(new Date(new Date('2023-04-01').getTime()).toLocaleDateString());
  return (
    <div>
      <LineChart width={400} height={150} data={data}>
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

export default SampleGraph;
