import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { Navbar as Nav, NavbarBrand, NavbarContent, NavbarItem, Button, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, useDisclosure } from "@nextui-org/react";
import { MarvelLogo } from "./MarvelLogo";
import { LoginModal, RegisterModal, UserAuthenticated } from ".";
import { RootState } from "../../store/store";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean | undefined>(false);
    const { pathname } = useLocation()
    const { isOpen: isOpenLogin, onOpen: onOpenLogin, onOpenChange: onOpenChangeLogin } = useDisclosure();
    const { isOpen: isOpenRegister, onOpen: onOpenRegister, onOpenChange: onOpenChangeRegister } = useDisclosure();
    const { status } = useSelector((state: RootState) => state.auth);

    const authItems = [
        status === 'authenticated' ? (
            [
                {
                    name: "Favoritos",
                    url: "/favorites"
                },
                {
                    name: "Perfil",
                    url: "/profile"
                }
            ]
        ) : (
            [
                {
                    name: "Iniciar sesión",
                    url: "/login"
                },
                {
                    name: "Registrarse",
                    url: "/register"
                }
            ]
        ),
    ];

    const menuItems = [
        {
            name: "Personajes",
            url: "/characters"
        },
        {
            name: "Comics",
            url: "/comics"
        },
        ...authItems[0]
    ];

    return (
        <>
            <Nav onMenuOpenChange={setIsMenuOpen}>
                <NavbarContent>
                    <NavbarMenuToggle
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        className="sm:hidden"
                    />
                    <NavbarBrand>
                        <Link to="/">
                            <MarvelLogo />
                        </Link>
                    </NavbarBrand>
                </NavbarContent>
                <NavbarContent className="hidden sm:flex gap-4" justify="center">
                    <NavbarItem>
                        <Link className={pathname.includes('/characters') ? "w-full text-purple-600 font-bold" : "w-full"} color="foreground" to="/characters">
                            Personajes
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className={pathname.includes('/comics') ? "w-full text-purple-600 font-bold" : "w-full"} color="foreground" to="/comics">
                            Comics
                        </Link>
                    </NavbarItem>
                    {
                        status === 'authenticated' && (
                            <NavbarItem>
                                <Link className={pathname.includes('/favorites') ? "w-full text-purple-600 font-bold" : "w-full"} color="foreground" to="/favorites">
                                    Favoritos
                                </Link>
                            </NavbarItem>
                                )
                    }
                            </NavbarContent>
                    {
                        status === 'authenticated' ? (
                            <NavbarContent justify="end">
                                <NavbarItem>
                                    <UserAuthenticated />
                                </NavbarItem>
                            </NavbarContent>
                        ) : (
                            <NavbarContent justify="end">
                                <NavbarItem className="lg:flex">
                                    <Button onClick={onOpenLogin} color="default" variant="light">
                                        Iniciar sesión
                                    </Button>
                                </NavbarItem>
                                <NavbarItem>
                                    <Button onClick={onOpenRegister} color="primary" variant="flat">
                                        Registrarse
                                    </Button>
                                </NavbarItem>
                            </NavbarContent>
                        )
                    }
                    <NavbarMenu>
                        {menuItems.map((item, index) => (
                            <NavbarMenuItem key={`${item}-${index}`}>
                                <Link
                                    color={
                                        index === 2 ? "primary" : index === menuItems.length - 1 ? "danger" : "foreground"
                                    }
                                    className={pathname === item.url ? "w-full text-purple-600 font-medium" : "w-full"}
                                    to={item.url}
                                >
                                    {item.name}
                                </Link>
                            </NavbarMenuItem>
                        ))}
                    </NavbarMenu>
            </Nav>
            <LoginModal isOpen={isOpenLogin} onOpenChange={onOpenChangeLogin} />
            <RegisterModal isOpen={isOpenRegister} onOpenChange={onOpenChangeRegister} />
        </>
    )
}
