import { Outlet, useLocation } from 'react-router';
import { Header } from './Header';
import { Footer } from './Footer';
import { getLanguageFromPath } from '../../utils/i18n';

export function PublicLayout() {
  const location = useLocation();
  const language = getLanguageFromPath(location.pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Header language={language} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer language={language} />
    </div>
  );
}
