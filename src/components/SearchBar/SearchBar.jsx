import { useState } from 'react';
import { toast } from 'react-hot-toast';
import css from './SearchBar.module.css'

const SearchBar = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === '') {
      toast.error('Please enter your search details');
      return;
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <header className={css.search}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.input}
          type="text"
          value={input}
          onChange={handleChange}
          autoComplete="off"
          autoFocus
          placeholder="Search images"
        />
        <button className={css.button} type="submit">Search</button>
      </form>
    </header>
  );
};

export default SearchBar;
