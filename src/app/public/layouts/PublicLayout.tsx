import { Outlet } from 'react-router';
import { LanguageProvider } from '../../shared/contexts/LanguageContext';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ScrollToTop } from '../components/ScrollToTop';
import { AnalyticsManager } from '../components/AnalyticsManager';
import { WhatsAppFloatingButton } from '../../shared/components/whatsapp/WhatsAppFloatingButton';

export function PublicLayout() {
  return (
    <LanguageProvider>
      <ScrollToTop />
      <AnalyticsManager />
      <AnimatedBackground />
      <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
        <Header />
        <main className="flex-1 pt-0 w-full overflow-x-hidden">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloatingButton />
      </div>
    </LanguageProvider>
  );
}
