import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = () => {
  const { setSearchTerm } = useGlobalContext();
  const searchRef = React.useRef('');

  const getInput = () => {
    const input = searchRef.current.value;
    setSearchTerm(input);
  };
  return (
    <section className='section search'>
      <form className='search-form'>
        <div className='form-control'>
          <label htmlFor='name'>search your favorite cocktail</label>
          <input
            type='text'
            name='name'
            id='name'
            ref={searchRef}
            onChange={getInput}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
