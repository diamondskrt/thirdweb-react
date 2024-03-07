import { ThemeProvider } from '@/providers/theme-provider';
import { ThemeSwitcher } from '@/components/theme-switcher';

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="thirdweb-ui-theme">
      <main>
        <ThemeSwitcher />
      </main>
    </ThemeProvider>
  );
}

export default App;
