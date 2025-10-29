import { createAsyncThunk } from '@reduxjs/toolkit';
// import { useStore } from 'react-redux';
// import getCookie from '../hooks/getCookie';

export const fetchFileUser = createAsyncThunk(
  'storege',
  async (results, { rejectWithValue }) => {
    // const csrfToken = getCookie('csrftoken'); // Получаем токен из cookie
    // console.log(csrfToken, ' - csrfToken');
    console.log(results.token, ' - resuls.token');

    try {
      const response = await fetch("http://127.0.0.1:8000/storage/", {
        method: 'GET',
        credentials: 'include',    // Включаем передачу cookie для аутентификации
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${results.token}`, // Используем токен аутентификации
          // 'X-CSRFToken': csrfToken, // Устанавливаем токен в заголовке
        },
      });

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
