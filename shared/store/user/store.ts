import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./const";
import { UserInfoClient } from "@/types/user";
import { LoadingStatus } from "@/types/ui";

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, { payload }: PayloadAction<UserInfoClient>) {
      state.user = payload;
    },
    clearUser(state) {
      state.user = null;
    },
    setLoadingStatus(state, { payload }: PayloadAction<LoadingStatus>) {
      state.status = payload;
    },
  },
});

export const { actions, reducer, name } = authSlice;
