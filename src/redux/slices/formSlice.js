import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isModalLoginForm: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    visibleLoginForm: (state) => {
      state.isModalLoginForm = true;
    },
    invisibleLoginForm: (state) => {
      state.isModalLoginForm = false;
    },
  },
});

export const { visibleLoginForm, invisibleLoginForm } = formSlice.actions;
export default formSlice.reducer;
