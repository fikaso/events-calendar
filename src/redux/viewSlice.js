import { createSlice } from '@reduxjs/toolkit';

import { displayView, viewKind, inputModal } from '../data/viewEnums';

export const viewSlice = createSlice({
  name: 'view',
  initialState: {
    kind: viewKind.LIST,
    displayView: displayView.WEEK,
    inputModal: inputModal.OFF,
  },
  reducers: {
    toggleKind: (state) => {
      state.kind = !state.kind;
    },
    setView: (state, action) => {
      state.displayView = action.payload;
    },
    toggleInputModal: (state) => {
      state.inputModal = !state.inputModal;
    },
  },
});

export const { toggleKind, setView, toggleInputModal } = viewSlice.actions;

export const selectViewKind = (state) => state.view.kind;
export const selectViewDays = (state) => state.view.displayView;
export const selectInputModal = (state) => state.view.inputModal;

export default viewSlice.reducer;
