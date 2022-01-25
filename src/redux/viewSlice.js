import { createSlice } from '@reduxjs/toolkit';

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    kind: 'list',
    viewDays: 7,
  },
  reducers: {
    setKind: (state, action) => {
      state.kind = action.payload;
    },
    setViewDays: (state, action) => {
      state.viewDays = action.payload;
    },
  },
});

export const { setKind, setViewDays } = viewSlice.actions;

export const selectViewKind = (state) => state.view.kind;
export const selectViewDays = (state) => state.view.viewDays;

export default viewSlice.reducer;
