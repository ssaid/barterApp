import {
  Navbar as NavBarNUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button
} from "@nextui-org/react";
import { ThemeSwitch } from "./ThemeSwitch";

export const Navbar = () => {
  return (
    <NavBarNUI shouldHideOnScroll>
      <NavbarBrand>
        <p className="font-bold text-inherit">LOGO</p>
      </NavbarBrand>
      <NavbarContent justify="end" className="gap-1 md:gap-3">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="bordered" className="hidden md:flex">
            Registrarse
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="shadow">
            Ingresar
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NavBarNUI>
  );
}
