import { combineReducers } from 'redux';

import { filterReducer } from './filters/filterSlice';
import { contactsApi } from 'service/contactsAPI';

export const reducer = combineReducers({
  filter: filterReducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
});
