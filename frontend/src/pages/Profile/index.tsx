import { PageLayout } from '@/layouts/PageLayout/index.js';
import { ChangePassword } from './components/ChangePassword/index.js';

const Profile = () => {
  return (
    <PageLayout title="Профиль">
      <div className="d-flex flex-column gap-3 col-lg-6">
        <ChangePassword />
      </div>
    </PageLayout>
  );
};

export default Profile;
