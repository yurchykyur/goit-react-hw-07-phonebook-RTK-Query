import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactAmount from 'components/ContactAmount';
import Notification from 'components/Notification';

import { AppContainer, MainTitle, SecondTitle } from './App.styled';

import * as Service from 'service';
import Spinner from 'components/Spinner';

export default function App() {
  const {
    data: contacts,
    isLoading,
    isError,
    error,
  } = Service.contactsAPI.useGetContactsQuery();

  if (isError) {
    Service.toastifyMessage.toastError(
      `${error.data}. Status - ${error.status}. Something went wrong, please try again later.`
    );
  }

  return (
    <AppContainer>
      <MainTitle>Phonebook</MainTitle>
      <ContactForm />
      <SecondTitle>Contacts</SecondTitle>
      <Filter />
      <ContactAmount></ContactAmount>
      {contacts?.length > 0 ? (
        <ContactList />
      ) : (
        <Notification
          message={'There are no contacts in your phonebook'}
        ></Notification>
      )}
      {isLoading && <Spinner />}
      <ToastContainer />
    </AppContainer>
  );
}
