import { cn } from "@/shared/lib/utils/styles";
import Link from "next/link";
import { FC, PropsWithChildren } from "react";

interface AppLinkProps extends PropsWithChildren {
  to: string;
  className?: string;
}

export const AppLink: FC<AppLinkProps> = ({ children, to, className }) => (
  <Link
    className={cn(
      "mt-4 bg-neutral-200 dark:bg-neutral-800 w-full text-center py-1 rounded-lg font-bold underline",
      "hover:text-orange-500 transition-colors duration-300",
      className
    )}
    href={to}
  >
    {children}
  </Link>
);
