import { createSlice } from '@reduxjs/toolkit';
import { fetchLoginUser } from '../../fetch/fetchLoginUser';

const initialState = {
  value: '',
  visible: true,
  results: [],
  loading: false,
  error: null,
};

// Slice
const userSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // findValue: (state, action) => {
      //   state.value = action.payload;
      // },
      clear: (state) => {
        state.value = '';
        state.results = '';
        state.error = null;
      },
    },
    extraReducers(builder) {
      builder.addCase(fetchLoginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload, ' - action.payload');
        console.log(action.payload.Search, ' - action.payload.Search');

        state.results = action.payload || [];
        if (state.results != '') {
          console.log(state.results, ' - state.results 1');
          // state.results = notCloneId(state.results)
        }
      });
      builder.addCase(fetchLoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const { clear } = userSlice.actions;
export default userSlice.reducer;
