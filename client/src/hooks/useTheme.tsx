import { useEffect, useState } from "react";



export const useTheme = () => {
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.theme === 'light' ? 'light' : 'dark'
  );

  const handleToggle = () => {
    setMode( mode => mode === 'light' ? 'dark' : 'light' )
  }


  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(mode == 'dark' ? 'light' : 'dark');
    root.classList.add(mode);

    localStorage.setItem("theme", mode);

  }, [mode]);

  return {
    mode,
    handleToggle
  }
}
