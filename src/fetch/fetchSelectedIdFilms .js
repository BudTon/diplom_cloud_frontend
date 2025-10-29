import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchSelectedIdFilms = createAsyncThunk(
  'selected/fetchFilms', 
  async (title, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://www.omdbapi.com?apikey=64405bd2&i=${title}`);
      if (!response.ok) throw new Error('Request failed');
      return await response.json();
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load films');
    }
  }
);