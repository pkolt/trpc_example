import { useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { trpc } from '@/trpc.js';
import { PageUrl } from '@/constants.js';

export const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const onClickLogout = useCallback(() => navigate(PageUrl.Logout), [navigate]);
  const onClickProfile = useCallback(() => navigate(PageUrl.Profile), [navigate]);
  //! Fix id
  const { data: user } = trpc.user.current.useQuery();
  return (
    <nav className="navbar bg-body-tertiary rounded-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to={PageUrl.Dashboard}>
          Панель управления
        </Link>
        <div className="d-flex gap-4">
          <button className="align-items-center d-flex gap-1 btn btn-link" onClick={onClickProfile}>
            <i className="bi bi-person-circle" /> {user?.username}
          </button>
          <button className="btn btn-outline-dark btn-sm" onClick={onClickLogout}>
            Выход
          </button>
        </div>
      </div>
    </nav>
  );
};
