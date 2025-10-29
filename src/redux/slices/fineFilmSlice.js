import { createSlice } from '@reduxjs/toolkit';
import { fetchFilmsByTitle } from '../../fetch/fetchFilmsByTitle ';
import { notCloneId } from '../../hooks/notCloneId';

const initialState = {
  value: '',
  results: [],
  loading: false,
  error: null,
};

export const findFilmSlice = createSlice({
  name: 'find',
  initialState,
  reducers: {
    findValue: (state, action) => {
      state.value = action.payload;
    },
    clear: (state) => {
      state.value = '';
      state.results = [];
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchFilmsByTitle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFilmsByTitle.fulfilled, (state, action) => {
      state.loading = false;
      state.results = action.payload.Search || [];
      if (state.results != []) {
        state.results = notCloneId(state.results)
      }
    });
    builder.addCase(fetchFilmsByTitle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const { findValue, clear } = findFilmSlice.actions;
export default findFilmSlice.reducer;