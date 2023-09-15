import { Button } from "@nextui-org/react";
import { useTheme } from "../../../hooks/useTheme";
import { BsFillSunFill, BsMoonStarsFill } from "react-icons/bs";

export const ThemeSwitch = () => {
  
  const { mode, handleToggle } = useTheme()

  return (
    <Button isIconOnly variant="light" onClick={handleToggle}>
      {
        mode === 'light'
          ? <BsMoonStarsFill color={'#b5afaa'} /> 
          : <BsFillSunFill color="#fbbf24"/>
      }
    </Button>
    
  )
}


