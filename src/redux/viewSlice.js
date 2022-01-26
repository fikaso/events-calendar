import { createSlice } from '@reduxjs/toolkit';

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    kind: false,
    viewDays: 30,
  },
  reducers: {
    toggleKind: (state) => {
      state.kind = !state.kind;
    },
    setViewDays: (state, action) => {
      state.viewDays = action.payload;
    },
  },
});

export const { toggleKind, setViewDays } = viewSlice.actions;

export const selectViewKind = (state) => state.view.kind;
export const selectViewDays = (state) => state.view.viewDays;

export default viewSlice.reducer;
