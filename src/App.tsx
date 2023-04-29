import './App.css';
import RecordingForm from './components/Form/RecordingForm';
import SampleGraph from './components/Graph/SampleGraph';
import { useQuery } from '@tanstack/react-query';
import scanItemsFunc from './aws/scanItemsFunc';

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
        <SampleGraph />
      </header>
    </div>
  );
};

export default App;
