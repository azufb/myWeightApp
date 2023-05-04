import './App.css';
import RecordingForm from './components/Form/RecordingForm';
import { useQuery } from '@tanstack/react-query';
import Graph from './components/Graph/Graph';
import getData from './ts/getData';

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

  console.log(data);

  return (
    <div className='App'>
      <header className='App-header'>
        <RecordingForm />
        <Graph />
      </header>
    </div>
  );
};

export default App;
