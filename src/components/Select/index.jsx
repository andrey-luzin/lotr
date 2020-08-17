import React from 'react';

import './Select.scss';

const Select = ({
  onChange = (_e) => null,
  list = [],
  value = ""
}) => {
  /**
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  const handleOnChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <div className="select">
      <select
        className="select__element"
        name="person"
        value={value}
        onChange={e => handleOnChange(e)}
      >
        <option value="" disabled hidden>Выбери героя</option>
        {
          list.map((person, index) => 
            <option
              className="select__option"
              value={person.heroId}
              key={index}
            >
              {person.hero}
            </option>
          )
        }
      </select>
    </div>
  );
};

export default Select;
