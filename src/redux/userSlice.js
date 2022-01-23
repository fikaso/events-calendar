import { createSlice } from '@reduxjs/toolkit';
import { auth } from '../firebase';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: null,
  },
  reducers: {
    logIn: (state, action) => {
      state.value = action.payload;
    },
    logOut: (state) => {
      state.value = null;
      localStorage.removeItem('accessToken');
      auth.signOut();
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
