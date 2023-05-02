import './App.css';
import RecordingForm from './components/Form/RecordingForm';
import SampleGraph from './components/Graph/SampleGraph';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <RecordingForm />
        <SampleGraph />
      </header>
    </div>
  );
}

export default App;
