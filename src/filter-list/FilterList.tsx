import React from 'react';
import './FilterList.scss';

export const FilterList = () => {
  return (
    <ul className='filters-list'>
      <li className='filters-category'>
        <h3 className='filters-category__title'>Категория</h3>
        <ul className='filters-category__list'>
          <li className='filters-category__item'>недвижимость</li>
          <li className='filters-category__item'>фотоаппараты</li>
          <li className='filters-category__item'>автомобили</li>
          <li className='filters-category__item'>ноутбуки</li>
        </ul>
      </li>
      <li className='filters-category'>
        <h3 className='filters-category__title'>Цена</h3>
        <div className='filters-category__content'>
          <span>от</span>
          <input type='number'/>
          <span>до</span>
          <input type='number'/>
        </div>
      </li>
      <li className='filters-category'>
        <h3 className='filters-category__title'>Избранное</h3>
      </li>
    </ul>
  );
};
