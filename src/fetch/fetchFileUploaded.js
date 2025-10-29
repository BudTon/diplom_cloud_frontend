import { createAsyncThunk } from '@reduxjs/toolkit';

// Функцию fetchFileUploaded делаем обычной функцией с параметрами
export const fetchFileUploaded = createAsyncThunk(
  'storege_uploaded',
  async (values, { rejectWithValue, getState }) => {
    // Получаем токен из store через getState, это разрешено в thunk-е
    const results = getState().user.results;
    const token = results?.token;

    console.log(token, ' - token');

    const formData = new FormData();
    formData.append('file', values.selectedFile);
    formData.append('comment', values.comment);

    console.log(formData, ' - formData');

    try {
      const response = await fetch("http://127.0.0.1:8000/storage/", {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${token}`,
        },
        body: formData
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
