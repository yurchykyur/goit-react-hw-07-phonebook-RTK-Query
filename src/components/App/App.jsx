import React from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Oval } from 'react-loader-spinner';

import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import ContactAmount from 'components/ContactAmount';
import Notification from 'components/Notification';

import {
  AppContainer,
  MainTitle,
  SecondTitle,
  OvalWrapper,
} from './App.styled';

import * as Service from 'service';

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
      {isLoading && (
        <OvalWrapper>
          <Oval
            height={80}
            width={80}
            color="#534da9"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="oval-loading"
            secondaryColor="#4fa94d"
            strokeWidth={2}
            strokeWidthSecondary={2}
          />
        </OvalWrapper>
      )}
      <ToastContainer />
    </AppContainer>
  );
}
