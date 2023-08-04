import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../Redux/ContactsSlice';
import styles from './Filer.module.css';

const Filter = ({ value, onChange }) => {
  return (
    <label className={styles.label}>
      Find contacts by name:
      <input
        className={styles.input}
        type="text"
        value={value}
        onChange={onChange}
      />
    </label>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Filter;
