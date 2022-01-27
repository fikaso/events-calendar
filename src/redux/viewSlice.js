import { createSlice } from '@reduxjs/toolkit';

import { displayView, viewKind } from '../data/viewEnums';

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    kind: viewKind.LIST,
    displayView: displayView.WEEK,
  },
  reducers: {
    toggleKind: (state) => {
      state.kind = !state.kind;
    },
    setView: (state, action) => {
      state.displayView = action.payload;
    },
  },
});

export const { toggleKind, setView } = viewSlice.actions;

export const selectViewKind = (state) => state.view.kind;
export const selectViewDays = (state) => state.view.displayView;

export default viewSlice.reducer;
