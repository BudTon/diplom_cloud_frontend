import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  hiddenPages: 'hidden',
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    hidden: (state) => {
      state.hiddenPages = 'hidden';
    },
    nothidden: (state) => {
      state.hiddenPages = '';
    },
  },
});

export const { hidden, nothidden } = menuSlice.actions;
export default menuSlice.reducer;
