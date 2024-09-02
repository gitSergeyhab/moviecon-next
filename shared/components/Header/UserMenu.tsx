"use client";
import { FC, MouseEventHandler, useState } from "react";
import { useSelector } from "react-redux";
import { UserIcon } from "lucide-react";
import { noAuthUserMenuItems, userMenuItems } from "./const";
import { userSelectors } from "@/shared/store/user";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils/styles";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCloseOnOutClick } from "@/shared/hooks/useCloseOnOutClick";

export const UserMenu: FC = () => {
  const user = useSelector(userSelectors.getUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const router = useRouter();

  useCloseOnOutClick({
    noCloseDataId: "user-menu",
    onClose: () => setIsMenuOpen(false),
  });

  const closeNavMenu: MouseEventHandler = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  const menuItems = user ? userMenuItems : noAuthUserMenuItems;
  const src = user?.avatar;

  return (
    <div className="relative h-10">
      <button
        onClick={closeNavMenu}
        data-no-close={"user-menu"}
        type="button"
        aria-label="Меню пользователя"
        className={cn(
          "border-neutral-800 dark:border-neutral-200  h-10 border-4 rounded-md px-3",
          "hover:text-orange-600 transition-colors duration-300"
        )}
      >
        {src ? (
          <Avatar>
            <AvatarImage src={src} />
            <AvatarFallback>Вы</AvatarFallback>
          </Avatar>
        ) : (
          <UserIcon />
        )}
      </button>
      {isMenuOpen && (
        <div
          className={cn(
            "absolute right-0 bg-base-gradient flex flex-col gap-1 p-1 py-2 border-4"
          )}
        >
          <div className="text-center">
            {user ? user.name : "вход не выполнен"}
          </div>
          <hr className="mb-2" />
          {menuItems.map(({ href, icon, title, onClick }) => (
            <button
              type="button"
              className={cn(
                "bg-neutral-500/10 flex justify-between border-0 items-center h-10 min-w-40 px-2 rounded-none",
                "transition-colors hover:bg-neutral-500/70"
              )}
              onClick={onClick || (() => router.push(href))}
              key={title}
            >
              {title}
              {icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
