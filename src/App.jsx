import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import ContactForm from './components/ContactForm/ContactForm';
import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import styles from './App.module.css';
import {
  addContact,
  deleteContact,
  setFilter,
} from './components/Redux/ContactsSlice';

const App = () => {
  // Додайте станові змінні
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      dispatch(setFilter(savedFilter));
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  const handleNameChange = event => {
    setName(event.target.value); // Використовуйте setName для оновлення стану name
  };

  const handleNumberChange = event => {
    setNumber(event.target.value); // Використовуйте setNumber для оновлення стану number
  };

  const handleAddContact = event => {
    event.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} вже є у контактах.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    dispatch(addContact(newContact)); // Диспатч дії addContact з новим контактом
    setName(''); // Очистити поле вводу name
    setNumber(''); // Очистити поле вводу number
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId)); // Диспатч дії deleteContact з ідентифікатором контакту
  };

  const handleFilterChange = event => {
    dispatch(setFilter(event.target.value)); // Диспатч дії setFilter зі значенням фільтра
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Телефонна книга</h1>

      <ContactForm
        name={name}
        number={number}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleAddContact}
      />

      <h2 className={styles.subtitle}>Контакти</h2>

      <Filter value={filter} onChange={handleFilterChange} />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
