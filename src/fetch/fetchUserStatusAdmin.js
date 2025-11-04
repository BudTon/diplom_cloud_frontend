import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserStatusAdmin = createAsyncThunk(
  'user/StatusAdminUser',
  async ({ userId, newIsStaff, token }, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue('No valid token provided!');
    }

    console.log(userId);
    console.log(newIsStaff);
    console.log(token);

    try {
      const response = await fetch(`http://127.0.0.1:8000/user/${userId}/`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({newIsStaff}),
      });

      if (!response.ok) {
        const text = await response.text(); // Получаем текст ответа
        console.error("Server returned:", text);
        throw new Error("Server responded with an error.");
      }

      const isStaff = await response.json();
      console.log("Status isStaff installed:", isStaff);
      return isStaff;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update isStaff');
    }
  }
);
