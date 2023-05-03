import './App.css';
import RecordingForm from './components/Form/RecordingForm';
import { useQuery } from '@tanstack/react-query';
import Graph from './components/Graph/Graph';

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: () =>
      fetch('http://localhost:9000/getItems', {
        method: 'GET',
      }).then((result) => {
        return result.json();
      }),
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
