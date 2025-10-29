import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: '',
  results: [],
};

export const favouriteSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addToFavourites: (state, action) => {
      state.results.push(action.payload);
    },
    removeFromFavourites: (state, action) => {
      state.results = state.results.filter(film => film.imdbID !== action.payload);
    },
  },
});

export const { addToFavourites, removeFromFavourites } = favouriteSlice.actions;
export default favouriteSlice.reducer;