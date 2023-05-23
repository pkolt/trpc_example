import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.js';
import { PageUrl } from '@/constants.js';

type PrivatePageProps = React.PropsWithChildren;

export const PrivatePage: React.FC<PrivatePageProps> = ({ children }) => {
  const auth = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.data) {
      navigate(PageUrl.Login);
    }
  }, [auth, navigate]);

  return <>{auth.data ? children : null}</>;
};
