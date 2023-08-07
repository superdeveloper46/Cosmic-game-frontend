import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isHammersClickable: true
};

export const slice = createSlice({
  name: "inventories",
  initialState,
  reducers: {
    setIsHammersClickable: (state, action) => {
      state.isHammersClickable = action.payload;
    },
  },
});

export default slice.reducer;

export const setIsHammersClickable = (clickable) => (dispatch) => {
  dispatch(slice.actions.setIsHammersClickable(clickable));
};
