import { NavBar } from '@/components/NavBar/index.js';

interface PageLayoutProps extends React.PropsWithChildren {
  title?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children, title }) => {
  return (
    <div className="container h-100 d-flex flex-column gap-3">
      <NavBar />
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};
