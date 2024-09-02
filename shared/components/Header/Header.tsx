"use client";

import { MouseEventHandler, useState } from "react";
import { HeaderNav } from "./HeaderNav";
import { NavMenuLink } from "./NavMenuLink";
import { UserMenu } from "./UserMenu";
import { useSelector } from "react-redux";
import { userSelectors } from "@/shared/store/user";
import { useCloseOnOutClick } from "@/shared/hooks/useCloseOnOutClick";
import { getNavMenuItems } from "./helpers";
import MenuIcon from "../icons/menu";
import Link from "next/link";
import appRoutes from "@/shared/lib/configs/routes/routes";
import PopcornIcon from "../icons/popcorn";
import { ToggleTheme } from "../ToggleTheme";
import { cn } from "@/shared/lib/utils/styles";

const Header = () => {
  const user = useSelector(userSelectors.getUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useCloseOnOutClick({
    noCloseDataId: "nav-menu",
    onClose: () => setIsMenuOpen(false),
  });

  const closeNavMenu: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const navMenuItems = getNavMenuItems(user?.role);

  return (
    <header className="fixed top-0 bg-base-gradient w-full min-w-80 z-20 shadow-xl">
      <div className="flex items-center  justify-between m-auto max-w-[1400px] font-bold px-4 min-h-12 md:min-h-16">
        <button
          data-no-close={"nav-menu"}
          className={cn(
            "mr-4 md:hidden",
            "hover:text-orange-500 transition-colors duration-300"
          )}
          onClick={closeNavMenu}
          aria-label="Меню навигации"
        >
          <MenuIcon className="w-8 h-8" />
        </button>
        <Link
          href={appRoutes.main}
          className={"hover:text-orange-500 transition-colors duration-300"}
          aria-label="На главную"
        >
          <PopcornIcon width={32} />
        </Link>
        <div className="flex items-center gap-8">
          <HeaderNav isMenuOpen={isMenuOpen}>
            {navMenuItems.map((item) => (
              <NavMenuLink item={item} key={item.href} />
            ))}
          </HeaderNav>
          <ToggleTheme />
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default Header;
