import './App.css';
import RecordingForm from './components/Form/RecordingForm';
import SampleGraph from './components/Graph/SampleGraph';

function App() {
  const body = {
    msg: 'POSTしたで。ほな、さいなら。',
  };

  const func = async () => {
    const data: Response = await fetch('http://localhost:9000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    console.log('body:', JSON.stringify(body));
    // fetch APIはpromiseを返すので、メソッドチェーンで解決する必要がある
    data.text().then((t) => console.log(t));
  };

  func();

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
