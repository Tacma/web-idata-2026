import { RouterProvider } from 'react-router';
import { router } from './routes.tsx';
import { RuntimeSEOSettingsSync } from './shared/components/RuntimeSEOSettingsSync.tsx';
import { ThemeProvider } from './shared/contexts/ThemeContext.tsx';

export default function App() {
  return (
    <ThemeProvider>
      <RuntimeSEOSettingsSync />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}
