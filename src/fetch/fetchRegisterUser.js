import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchRegisterUser = createAsyncThunk(
  'register_user',
  async ({ username, firstname, email, password, isStaff }, { rejectWithValue }) => {
    console.log(
      'username:', username, '\n',
      'firstname:', firstname,'\n',
      'email:', email, '\n',
      'password:', password, '\n',
      'is_staff:', isStaff, '\n',
      '-------fetchRegisterUser-------');

    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Token ${resuls.token}`,  // Здесь передаётся токен
        },
        body: JSON.stringify({ username: username, firstname:firstname, email: email, password: password, is_staff: isStaff })
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
