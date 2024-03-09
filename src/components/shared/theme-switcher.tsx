import { useTheme } from '@/providers/theme-provider';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const isLight = theme === 'light';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => (isLight ? setTheme('dark') : setTheme('light'))}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
