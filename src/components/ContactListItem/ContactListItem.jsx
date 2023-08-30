import {
  ContactItemName,
  ContactItemNum,
  ContactItemWrapper,
  DeleteBtn,
  ListElement,
} from 'components/ContactList/ContactList.styled';

import { useDeleteContactsMutation } from 'service/contactsAPI';

export default function PhonebookListItem({ id, name, number }) {
  const [deleteContact, resultDeleteContact] = useDeleteContactsMutation();

  const deleteContacts = id => {
    console.log(id);
    deleteContact(id);
  };

  return (
    <ListElement>
      {resultDeleteContact.isLoading && <h1>Deleting ...</h1>}
      <ContactItemWrapper>
        <ContactItemName>{name}</ContactItemName>
        <ContactItemNum href={`tel:${number}`}>{number}</ContactItemNum>
        <DeleteBtn onClick={() => deleteContacts(id)}>Delete</DeleteBtn>
      </ContactItemWrapper>
    </ListElement>
  );
}
