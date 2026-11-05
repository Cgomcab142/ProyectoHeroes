import { Link, useLocation } from "react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "../ui/navigation-menu";
import { cn } from "cn";

export const CustomMenu = () => {
  const { pathname } = useLocation();
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <NavigationMenu className="py-5">
      <NavigationMenuList>
        {/* Home */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/" />}
            className={cn(isActive("/") && "bg-slate-200", "rounded-md p-2")}
          >
            Inicio
          </NavigationMenuLink>
        </NavigationMenuItem>
        {/* Search */}
        <NavigationMenuItem>
          <NavigationMenuLink
            render={<Link to="/search" />}
            className={cn(
              isActive("/search") && "bg-slate-200",
              "rounded-md p-2",
            )}
          >
            Buscar Superhéroes
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};
