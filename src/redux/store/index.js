import { configureStore } from '@reduxjs/toolkit';
import findFilmSlice from "../slices/fineFilmSlice";
import selectedSlice from "../slices/selectedSlice";
import favouriteSlice from "../slices/favouriteSlice";
import userSlice from "../slices/userSlice";
import fileSlice from "../slices/fileSlice";
import menuRegSlice from "../slices/menuRegSlice";
import menuSlice from "../slices/menuSlice";
import formSlice from "../slices/formSlice";

export const store = configureStore({
  reducer: {
    find: findFilmSlice,
    selected: selectedSlice,
    favourites: favouriteSlice,
    user: userSlice,
    file: fileSlice,
    menuReg: menuRegSlice,
    menu: menuSlice,
    form: formSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

