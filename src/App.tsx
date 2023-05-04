import './App.css';
import RecordingForm from './components/Form/RecordingForm';
import { useQuery } from '@tanstack/react-query';
import Graph from './components/Graph/Graph';
import getData from './ts/getData';

const App = (): JSX.Element => {
  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

  console.log(data);

  return (
    <div className='App'>
      <header className='App-header'>
        <RecordingForm />
        {/* データがあればグラフを表示し、データがなければ、メッセージを表示する。 */}
        {data?.Count === 0 ? <p>データがありません。</p> : <Graph />}
      </header>
    </div>
  );
};

export default App;
