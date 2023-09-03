import {
  Navbar as NavBarNUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent
} from "@nextui-org/react";
import { ThemeSwitch } from "./ThemeSwitch";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../../context/auth";
import { UserOptions } from "./UserOptions";
import { SearchBar } from "./SearchBar";

export const Navbar = () => {

  const location = useLocation()

  const auth = useContext(AuthContext);


  useEffect(() => {
    auth.handleLogin({username: 'Dan', token: '123'})
  }, [])


  return (
    <NavBarNUI shouldHideOnScroll maxWidth="full">
      <NavbarBrand>
        <Link to='/' className="font-bold text-inherit">LOGO</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        <SearchBar />
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        {
          !auth.signed && (
            <>
              {
                (location.pathname === '/') &&
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
            </>
          )
        }
        {
          auth.signed && (
            <Popover placement="bottom">
              <PopoverTrigger>
                <Avatar
                  name={auth.username}
                  className="transition-transform cursor-pointer"
                  size='sm'
                  isBordered
                  color='secondary'
                />
              </PopoverTrigger>
              <PopoverContent className="p-1 w-56">
                <UserOptions />
              </PopoverContent>
            </Popover>
          )
        }
      </NavbarContent>
    </NavBarNUI>
  );
}
