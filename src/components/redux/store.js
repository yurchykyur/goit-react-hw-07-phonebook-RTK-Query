import { configureStore } from '@reduxjs/toolkit';

import { reducer as rootReducer } from './reducer';
import { contactsAPI as API } from 'service';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(API.contactsApi.middleware),
});
