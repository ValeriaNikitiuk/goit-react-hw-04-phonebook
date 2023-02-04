import { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import shortid from 'shortid';

const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(() => {
    return (
      JSON.parse(window.localStorage.getItem('contacts')) ?? [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onAddContact = ({ name, number }) => {
    const addContact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return false;
    }

    setContacts(prevState => [addContact, ...prevState]);
    return true;
  };

  const changeFilter = ({ target }) => {
    setFilter(target.value);
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={onAddContact} />
      <h1>Contacts</h1>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList deleteContact={deleteContact} contacts={visibleContacts} />
    </div>
  );
};

export default App;
