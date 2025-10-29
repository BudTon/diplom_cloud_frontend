import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFileDownload = createAsyncThunk(
  "storage/downloadFile",
  async ({ fileId, token, file_name }, { rejectWithValue }) => {

    try {
      const response = await fetch(`http://127.0.0.1:8000/storage/files/${fileId}`, {
        method: 'GET',
        credentials: 'include',    // Включаем передачу cookie для аутентификации
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`, // Используем токен аутентификации
        },
      });

      if (!response.ok) {
        const text = await response.text(); // Получаем текст ответа
        console.error("Server returned:", text);
        throw new Error("Server responded with an error.");
      }
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = file_name;
      link.click();
      URL.revokeObjectURL(link.href);
      link.remove();
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to load films');
    }
  }
);
