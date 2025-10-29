import { createSlice } from '@reduxjs/toolkit';
import { fetchFileUser } from '../../fetch/fetchFileUser';

const initialState = {
  value: '',
  visible: true,
  results: [],
  loading: false,
  error: null,
};

// Slice
const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    // findValue: (state, action) => {
      //   state.value = action.payload;
      // },
      clear: (state) => {
        state.value = '';
        state.results = [];
        state.error = null;
      },
    },
    extraReducers(builder) {
      builder.addCase(fetchFileUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(fetchFileUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, ' - action.payload');
        console.log(action.payload.Search, ' - action.payload.Search');

        state.results = action.payload || [];
        if (state.results != []) {
          console.log(state.results, ' - state.results 1');
          // state.results = notCloneId(state.results)
        }
      });
      builder.addCase(fetchFileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const { clear } = fileSlice.actions;
export default fileSlice.reducer;
