import { Outlet } from 'react-router';
import { LanguageProvider } from '../../shared/contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';

export function PublicLayout() {
  return (
    <LanguageProvider>
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
        <Header />
        <main className="flex-1 pt-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}