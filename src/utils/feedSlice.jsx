import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeedUser(state, action) {
      return action.payload;
    },
    removeFeedUser(state, action) {
      return state?.filter((data) => data._id !== action.payload);
    },
    addNextFeedUser(state, action) {
      state.item = [...state.item, ...action.payload];
    },
  },
});

export const { addFeedUser, removeFeedUser } = feedSlice.actions;

export default feedSlice.reducer;
