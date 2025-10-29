import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFileRename = createAsyncThunk(
  'storage/renameFile',
  async ({ fileId, newFileName, newComment, token }, { rejectWithValue }) => {
    if (!token) {
      return rejectWithValue('No valid token provided!');
    }
    let data;
    if (newFileName) {
      data = { newFileName }
    }
    if (newComment) {
      data = { newComment }
    }
    try {
      const response = await fetch(`http://127.0.0.1:8000/storage/patch/${fileId}/`, {
        method: 'PATCH',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const text = await response.text(); // Получаем текст ответа
        console.error("Server returned:", text);
        throw new Error("Server responded with an error.");
      }

      const updatedFile = await response.json();
      console.log("File renamed successfully:", updatedFile);
      return updatedFile;
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to update file');
    }
  }
);
