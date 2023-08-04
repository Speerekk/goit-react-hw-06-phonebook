import React, { useEffect } from 'react';
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
  // Получаем данные из хранилища с помощью хука useSelector
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  // Используем хук useDispatch для отправки экшенов Redux
  const dispatch = useDispatch();

  // Загрузка данных из локального хранилища при монтировании компонента
  useEffect(() => {
    const savedFilter = localStorage.getItem('filter');
    if (savedFilter) {
      dispatch(setFilter(savedFilter));
    }
  }, [dispatch]);

  // Сохранение фильтра в локальное хранилище при его изменении
  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  const handleNameChange = event => {
    // Получаем новое значение из поля ввода имени и обновляем состояние
    setName(event.target.value);
  };

  const handleNumberChange = event => {
    // Получаем новое значение из поля ввода номера и обновляем состояние
    setNumber(event.target.value);
  };

  const handleAddContact = event => {
    event.preventDefault();

    const existingContact = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (existingContact) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    // Отправляем экшен Redux для добавления нового контакта
    dispatch(addContact(newContact));

    // Очищаем поля ввода после добавления контакта
    setName('');
    setNumber('');
  };

  const handleDeleteContact = contactId => {
    // Отправляем экшен Redux для удаления контакта по его ID
    dispatch(deleteContact(contactId));
  };

  const handleFilterChange = event => {
    // Получаем новое значение из поля ввода фильтра и обновляем его в хранилище
    dispatch(setFilter(event.target.value));
  };

  // Фильтруем контакты на основе значения фильтра
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.app}>
      <h1 className={styles.title}>Phonebook</h1>

      <ContactForm
        name={name}
        number={number}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
        onSubmit={handleAddContact}
      />

      <h2 className={styles.subtitle}>Contacts</h2>

      <Filter value={filter} onChange={handleFilterChange} />

      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
};

export default App;
