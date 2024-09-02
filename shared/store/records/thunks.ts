import { requestUserRecords$ } from "@/shared/clientApi/gameResult";
import { ApiError } from "@/types/api";
import { UserAggregateRecords } from "@/types/gameResult";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserRecords = createAsyncThunk<
  UserAggregateRecords[],
  undefined,
  { rejectValue: string }
>("records/fetchUserRecords", async (_, { rejectWithValue }) => {
  try {
    const records = await requestUserRecords$();
    return records;
  } catch (err) {
    return rejectWithValue((err as ApiError).message);
  }
});
