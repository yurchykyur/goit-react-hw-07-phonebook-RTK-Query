import { useSelector } from 'react-redux';

import { PhonebookList } from './ContactList.styled';

import PhonebookListItem from 'components/ContactListItem';
import { useGetContactsQuery } from 'service/contactsAPI';
import { selectFilter } from 'components/redux/filters/selectors';

export default function ContactList() {
  const { data } = useGetContactsQuery();
  const valueFilter = useSelector(selectFilter);

  const normalizedFilterQuery = valueFilter.toLowerCase();

  const filteredContacts = data.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilterQuery)
  );

  return (
    <>
      <PhonebookList>
        {filteredContacts?.map(contact => (
          <PhonebookListItem key={contact.id} {...contact} />
        ))}
      </PhonebookList>
    </>
  );
}
