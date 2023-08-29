import {
  Navbar as NavBarNUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button
} from "@nextui-org/react";
import { ThemeSwitch } from "./ThemeSwitch";
import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {

  const location = useLocation()



  return (
    <NavBarNUI shouldHideOnScroll maxWidth="full">
      <NavbarContent justify="end" className="gap-1 md:gap-3">
        <NavbarBrand>
          <Link to='/' className="font-bold text-inherit">LOGO</Link>
        </NavbarBrand>
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {
          !(location.pathname === '/register') &&
            <NavbarItem>
              <Button as={Link} color="primary" to="register" variant="ghost" className="hidden md:flex">
                Registrarse
              </Button>
            </NavbarItem>
        }
        {
          !(location.pathname === '/login') &&
            <NavbarItem>
              <Button as={Link} color="primary" to="login" variant="shadow">
                Ingresar
              </Button>
            </NavbarItem>
        }
      </NavbarContent>
    </NavBarNUI>
  );
}
