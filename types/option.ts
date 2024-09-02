import { ReactNode } from "react";

export type Option<T extends string | number = string> = {
  value: T;
  label: ReactNode;
};
