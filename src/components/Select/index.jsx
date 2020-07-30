import React from 'react';

import './Select.scss';

const persons = [
  {
    roleId: 'burglar',
    heroId: 'bilbo',
    hero: "Бильбо",
    role: "Взломщик",
  },
  {
    roleId: 'hunter',
    heroId: 'legolas',
    hero: "Леголас",
    role: "Охотник",
  }
];

const Select = () => {
  return (
    <div className="select">
      <select className="select__element" name="person">
        {
          persons.map(person => 
            <option className="select__option" value={person.roleId}>{person.hero}</option>
          )
        }
      </select>
    </div>
  );
};

export default Select;
