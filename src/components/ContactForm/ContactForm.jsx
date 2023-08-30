import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  FormWrapper,
  FormInputLabel,
  FormSubmitBtn,
  StyledForm,
  StyledField,
  StyledErrorMessage,
} from './ContactForm.styled';

import { toastifyMessage } from 'service';
import {
  useAddContactsMutation,
  useGetContactsQuery,
} from 'service/contactsAPI';

const addContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('A name is required'),
  number: Yup.number('Please, enter a number')
    .integer("A phone number can't include a decimal point")
    .positive("A phone number can't start with a minus")
    .required('A phone number is required'),
});

export default function ContactForm() {
  const { data: contacts } = useGetContactsQuery();
  const [updateContacts, result] = useAddContactsMutation();

  const handleFormSubmit = (newContact, { resetForm }) => {
    const { name } = newContact;

    if (
      contacts.length !== 0 &&
      contacts.find(
        contact =>
          contact.name.toLowerCase().trim() === name.toLowerCase().trim()
      )
    ) {
      toastifyMessage.toastWarn(`${name} is already in contacts`);

      return;
    }
    console.log(newContact);
    updateContacts(newContact);
    resetForm();
  };

  return (
    <>
      <FormWrapper>
        <Formik
          initialValues={{ name: '', number: '' }}
          validationSchema={addContactSchema}
          onSubmit={handleFormSubmit}
        >
          <StyledForm>
            <FormInputLabel>
              Name
              <StyledField name="name" type="text" placeholder="John Wick" />
              <StyledErrorMessage component="div" name="name" />
            </FormInputLabel>
            <FormInputLabel>
              Phone number
              <StyledField
                name="number"
                type="tel"
                placeholder="+380501234567"
              />
              <StyledErrorMessage component="div" name="number" />
            </FormInputLabel>
            <FormSubmitBtn type="submit" disabled={result.isLoading}>
              Add contact
            </FormSubmitBtn>
          </StyledForm>
        </Formik>
      </FormWrapper>
    </>
  );
}
