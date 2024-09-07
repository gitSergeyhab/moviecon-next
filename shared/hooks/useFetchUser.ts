import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./useAppDispatch";
import { userSelectors } from "../store/user";
import { fetchUser } from "../store/user/thunks";

export const useFetchUser = () => {
  const user = useSelector(userSelectors.getUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, []);
};
