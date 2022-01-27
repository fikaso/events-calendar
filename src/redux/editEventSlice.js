import { createSlice } from '@reduxjs/toolkit';

export const editedEventSlice = createSlice({
  name: 'editedEvent',
  initialState: {
    value: null,
    edit: false,
  },
  reducers: {
    editEvent: (state, action) => {
      state.value = action.payload;
      state.edit = true;
    },
    disableEdit: (state) => {
      state.edit = false;
    },
  },
});

export const { editEvent, disableEdit } = editedEventSlice.actions;

export const selectEditedEvent = (state) => state.editedEvent;

export default editedEventSlice.reducer;
