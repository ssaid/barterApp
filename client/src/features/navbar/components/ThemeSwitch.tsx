import React, { useEffect, useState } from "react";
import {MoonIcon} from "./MoonIcon";
import {SunIcon} from "./SunIcon";
import { Button } from "@nextui-org/react";

export const ThemeSwitch = () => {
  
  
  const [mode, setMode] = useState<'light' | 'dark'>(
    localStorage.theme === 'light' ? 'light' : 'dark'
  );

  const handleClick = () => {
    setMode( mode => mode === 'light' ? 'dark' : 'light' )
  }


  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove(mode == 'dark' ? 'light' : 'dark');
    root.classList.add(mode);

    localStorage.setItem("theme", mode);

  }, [mode]);

  return (
    <Button isIconOnly variant="light" onClick={handleClick}>
      {
        mode === 'light'
          ? <SunIcon />
          : <MoonIcon />

      }
    </Button>
    
  )
}


