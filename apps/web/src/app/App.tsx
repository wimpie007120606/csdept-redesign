import { RouterProvider } from 'react-router';
import { router } from './routes';
import { ThemeProvider } from './components/ThemeProvider';
import { LanguageProvider } from '@/i18n/LanguageProvider';

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </LanguageProvider>
  );
}
