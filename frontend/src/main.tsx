import { Suspense, StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/index.js';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
);
