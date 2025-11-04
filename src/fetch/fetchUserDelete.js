import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserDelete = createAsyncThunk(
  'storage/deleteUser',
  async ({userId, token}, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue('No valid token provided!');
    }
    console.log(userId);
    console.log(token);

    try {
      const response = await fetch(`http://127.0.0.1:8000/user/${userId}/`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        }
      });
      // console.log(await response.json(), ' - response');

      if (!response.ok) {
        const text = await response.text();
        console.error("Server returned:", text);
        throw new Error("Server responded with an error.");
      }
      console.log("Delete successful:", response.ok);
      return { status: response.status };;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete user');
    }
  }
);
