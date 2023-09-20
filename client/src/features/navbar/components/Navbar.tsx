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
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth";
import { UserOptions } from "./UserOptions";
import { SearchBar } from "./SearchBar";
import { useUserInfo } from "../hooks/useUserInfo";
import { ImageSizes } from "../../../types/category";

export const Navbar = () => {

  const location = useLocation()

  const auth = useContext(AuthContext);

  const { data } = useUserInfo({shouldFetch: auth.signed})

  return (
    <NavBarNUI 
      shouldHideOnScroll 
      maxWidth="full"
      classNames={{
        wrapper: 'px-3',
      }}
    >
      <NavbarBrand>
        <Link to='/' className="font-bold text-inherit">LOGO</Link>
      </NavbarBrand>
      <NavbarContent justify="center">
        { location.pathname === '/' && <SearchBar /> }
      </NavbarContent>
      <NavbarContent justify="end">
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
                  src={( data?.avatar as ImageSizes)?.medium_square_crop}
                  className="transition-transform cursor-pointer"
                  size='sm'
                  isBordered
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
