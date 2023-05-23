import { useEffect } from 'react';
import { useAuthStore } from '@/store/auth.js';
import { trpc } from '@/trpc.js';

const Logout = () => {
  const auth = useAuthStore();
  const { mutateAsync: logout } = trpc.auth.logout.useMutation();

  //! Bug double request
  useEffect(() => {
    logout().then(() => auth.reset());
  }, [auth, logout]);

  return null;
};

export default Logout;
