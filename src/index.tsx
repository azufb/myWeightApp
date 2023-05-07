import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// React Queryを使うための設定
const queryClient: QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // React Queryはデフォルトでコンポーネントにフォーカスを当てるとフェッチが動くので、無効にする
      refetchOnWindowFocus: false,
    },
  },
});

const root: ReactDOM.Root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
