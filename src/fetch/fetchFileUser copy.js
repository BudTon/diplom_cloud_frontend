import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFileUser = createAsyncThunk(
  'storege',
  async ({ username }, { rejectWithValue }) => {
    // console.log('username:', username, 'password:', password, '--------------');
    const user = username
    console.log(2222222, user);
    try {
      const response = await fetch("http://127.0.0.1:8000/storege/", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({ user })
      });
      console.log(response, ' - data');

      if (!response.ok) {
        const text = await response.text(); // Получаем текст ответа
        console.error("Server returned:", text);
        throw new Error("Server responded with an error.");
      }
      const data = await response.json();
      console.log("Login successful:", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load films');
    }
  }

);
