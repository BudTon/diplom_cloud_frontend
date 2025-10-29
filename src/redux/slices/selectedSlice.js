import { createSlice } from '@reduxjs/toolkit';
import { fetchSelectedIdFilms } from '../../fetch/fetchSelectedIdFilms ';

const initialState = {
  results: [],
  loading: false,
  error: null,
};

export const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    selected: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchSelectedIdFilms.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSelectedIdFilms.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload || undefined;
      
    });
    builder.addCase(fetchSelectedIdFilms.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { selected } = selectedSlice.actions;
export default selectedSlice.reducer;