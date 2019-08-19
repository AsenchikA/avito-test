import React from 'react';
import './App.scss';
import { FilterList } from './filter-list/FilterList';
import { ProductCard } from './product-card/ProductCard';
import { Sorting } from './sorting/Sorting';

const App: React.FC = () => {
  return (
    <div className='app'>
      <div className='app-container'>
        {/* <header className='app-header'>
        </header> */}
        <aside className='filters'>
          <h2 className='filters__title'>Фильтры</h2>
          <FilterList />
        </aside>
        <main>
          <div className='sorting'>
            <h2 className='sorting__title'>Сортировка</h2>
            <Sorting />
          </div>
          <ul className='catalog-list'>
            <li className='catalog-list__item'>
              <ProductCard />
            </li>
          </ul>
        </main>
      </div>
    </div>
  );
};

export default App;
