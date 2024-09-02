"use client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/shared/store";
import { FC, PropsWithChildren } from "react";

export const Provider: FC<PropsWithChildren> = ({ children }) => (
  <ReduxProvider store={store}>{children}</ReduxProvider>
);
