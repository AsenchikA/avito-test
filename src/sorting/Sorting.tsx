import React from 'react';

export const Sorting = () => {
  return (
    <div className='sorting'>
      <select name='sorting-select'>
        <option value='popular'>по популярности</option>
        <option value='price'>по возрастанию цены</option>
      </select>
    </div>
  );
};
