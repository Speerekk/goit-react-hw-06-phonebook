// store.js
import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from '../Redux/ContactsSlice';

const store = configureStore({
  reducer: {
    contacts: contactsReducer,
  },
});

export { store };
