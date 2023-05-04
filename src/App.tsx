import RecordingForm from './components/Form/RecordingForm';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Graph from './components/Graph/Graph';
import getData from './ts/getData';
import { GetResultDataType } from './types/GetResultDataType';

const App = (): JSX.Element => {
  const { data }: UseQueryResult<GetResultDataType | undefined> = useQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

  console.log(data);

  return (
    <div>
      <div>
        <RecordingForm />
        {/* データがあればグラフを表示し、データがなければ、メッセージを表示する。 */}
        {data?.Count === 0 ? <p>データがありません。</p> : <Graph />}
      </div>
    </div>
  );
};

export default App;
