import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://64e87afc99cf45b15fdfa20d.mockapi.io/api/v1/contacts',
  }),
  tagTypes: ['Contacts'],
  endpoints: builder => ({
    getContacts: builder.query({
      query: () => ``,
      providesTags: ['Contacts'],
    }),
    deleteContacts: builder.mutation({
      query(id) {
        return {
          url: `/${id}`,
          method: 'DELETE',
          // id,
        };
      },
      invalidatesTags: ['Contacts'],
    }),
    addContacts: builder.mutation({
      query(contact) {
        return {
          url: ``,
          method: 'POST',
          contact,
        };
      },
      invalidatesTags: ['Contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactsMutation,
  useDeleteContactsMutation,
} = contactsApi;
