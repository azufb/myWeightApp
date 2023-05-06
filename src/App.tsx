import RecordingForm from './components/Form/RecordingForm';
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import Graph from './components/Graph/Graph';
import getData from './ts/getData';
import { GetResultDataType } from './types/GetResultDataType';
import styles from './appStyle.module.scss';

const App = (): JSX.Element => {
  const { data }: UseQueryResult<GetResultDataType | undefined> = useQuery({
    queryKey: ['data'],
    queryFn: getData,
  });

  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <RecordingForm />
        <Graph />
        <p className={styles.dataCount}>現在のデータ数：{data?.Count}個</p>
      </div>
    </div>
  );
};

export default App;
