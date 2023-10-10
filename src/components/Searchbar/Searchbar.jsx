import React, { useState } from 'react';
import css from './Searchbar.module.css';

export function Searchbar({ submit }) {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    submit(value);
  };

  return (
    <div className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <div className={css.inputWrapper}>
          <label htmlFor="findImages"></label>
          <input
            className={css.SearchFormInput}
            name="title"
            type="text"
            onChange={handleChange}
            id="findImages"
            value={value}
            placeholder="Search images..."
          />
        </div>
      </form>
    </div>
  );
}

export default Searchbar;
