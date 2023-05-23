import '~bootstrap/dist/css/bootstrap.css';
import '~bootstrap-icons/font/bootstrap-icons.css';
import './index.css';

import { RouterProvider } from 'react-router-dom';
import { router } from '@/router.js';
import { TrpcProvider } from '@/trpc.js';

export const App: React.FC = () => {
  return (
    <TrpcProvider>
      <RouterProvider router={router} />
    </TrpcProvider>
  );
};
