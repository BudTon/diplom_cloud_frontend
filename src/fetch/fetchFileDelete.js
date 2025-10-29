import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFileDelete = createAsyncThunk(
  'storage/deleteFile',
  async (fileId, { rejectWithValue, getState }) => {
    const results = getState().user.results;
    const token = results?.token;

    try {
      const response = await fetch(`http://127.0.0.1:8000/storage/${fileId}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          Authorization: `Token ${token}`, // Используем полученный токен
        }
      });

      if (!response.ok) {
        const text = await response.text(); // Получаем текст ответа сервера
        console.error("Server returned:", text);
        throw new Error("Server responded with an error.");
      }

      const data = await response.json();
      console.log("Delete successful:", data);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to delete file');
    }
  }
);
