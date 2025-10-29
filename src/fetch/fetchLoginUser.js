import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchLoginUser = createAsyncThunk(
  'login',
  async ({ username, password }, {rejectWithValue}) => {
    console.log('username:', username, 'password:', password, '--------------');

    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          // 'X-CSRFToken': csrfToken, // Здесь передаётся токен
        },
        body: JSON.stringify({ username, password })

        // body: new URLSearchParams({
        //   username: username,
        //   password: password
        // }),// преобразование данных не в JSON
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
