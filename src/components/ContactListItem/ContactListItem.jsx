import {
  ContactItemName,
  ContactItemNum,
  ContactItemWrapper,
  DeleteBtn,
  ListElement,
} from 'components/ContactList/ContactList.styled';
import Spinner from 'components/Spinner';

import * as Service from 'service';

export default function PhonebookListItem({ id, name, number }) {
  const [deleteContact, { isLoading: isLoadingDC }] =
    Service.contactsAPI.useDeleteContactsMutation();

  const deleteContacts = id => {
    deleteContact(id)
      .unwrap()
      .then(() =>
        Service.toastifyMessage.toastSuccess(`Contact deleted successfully!`)
      )
      .catch(error =>
        Service.toastifyMessage.toastError(
          `${error.data}. Status - ${error.status}. Something went wrong, please try again later.`
        )
      );
  };

  return (
    <ListElement>
      <ContactItemWrapper>
        <ContactItemName>{name}</ContactItemName>
        <ContactItemNum href={`tel:${number}`}>{number}</ContactItemNum>
        <DeleteBtn onClick={() => deleteContacts(id)} disabled={isLoadingDC}>
          {isLoadingDC ? 'Deleting...' : 'Delete'}
        </DeleteBtn>
      </ContactItemWrapper>
      {isLoadingDC && <Spinner />}
    </ListElement>
  );
}
