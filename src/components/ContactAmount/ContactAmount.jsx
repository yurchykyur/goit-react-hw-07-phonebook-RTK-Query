import { useGetContactsQuery } from 'service/contactsAPI';

import { TotalContactsText, TotalContactsNum } from './ContactAmount.styled';

export default function ContactAmount() {
  const { data: contacts, isSuccess } = useGetContactsQuery();

  return (
    isSuccess && (
      <TotalContactsText>
        Contacts amount: <TotalContactsNum>{contacts.length}</TotalContactsNum>
      </TotalContactsText>
    )
  );
}
