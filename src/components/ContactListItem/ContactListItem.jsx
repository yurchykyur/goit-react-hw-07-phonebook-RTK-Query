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
  const [
    deleteContact,
    {
      isLoading: isLoadingDC,
      isSuccess: isSuccessDC,
      isError: isErrorDC,
      error: errorDC,
    },
  ] = Service.contactsAPI.useDeleteContactsMutation();

  const deleteContacts = id => {
    deleteContact(id);
  };

  if (isSuccessDC) {
    Service.toastifyMessage.toastSuccess(`Contact deleted successfully!`);
  }

  if (isErrorDC) {
    Service.toastifyMessage.toastError(
      `${errorDC.data}. Status - ${errorDC.status}. Something went wrong, please try again later.`
    );
  }

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
