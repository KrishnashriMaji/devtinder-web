import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequestUser(state, action) {
      return action.payload;
    },
    removeRequestUser(state, action) {
      return state?.filter((data) => data._id !== action.payload);
    },
    addNextRequestUser(state, action) {
      state.item = [...state.item, ...action.payload];
    },
  },
});

export const { addRequestUser, removeRequestUser } = requestSlice.actions;

export default requestSlice.reducer;
