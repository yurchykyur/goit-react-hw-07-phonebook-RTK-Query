import { createSelector } from '@reduxjs/toolkit';

import { useGetContactsQuery } from 'service/contactsAPI';

const selectFilter = state => state.filter;

const selectFilteredContacts = createSelector([selectFilter], valueFilter => {
  const { data } = useGetContactsQuery();

  const normalizedFilterQuery = valueFilter.toLowerCase();

  return data?.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterQuery)
  );
});

export { selectFilter, selectFilteredContacts };
