import './App.css';
import RecordingForm from './components/Form/RecordingForm';
import { useQuery } from '@tanstack/react-query';
import scanItemsFunc from './aws/scanItemsFunc';
import Graph from './components/Graph/Graph';

const App = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ['data'],
    queryFn: scanItemsFunc,
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
