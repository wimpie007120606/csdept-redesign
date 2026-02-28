import { ThemeProvider as NextThemeProvider } from 'next-themes';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="csdept-theme"
      themes={['light', 'maroon']}
    >
      {children}
    </NextThemeProvider>
  );
}
