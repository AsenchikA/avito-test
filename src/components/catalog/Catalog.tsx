import React from 'react';
import { ReactComponent as Loader } from '../../img/loader.svg';
import { IProduct } from '../../models/models';
import { ProductCard } from '../product-card/ProductCard';
import './Catalog.scss';

interface ICatalogProps {
  products: IProduct[];
  addToFavorites(id: string): void;
}

export const Catalog = (props: ICatalogProps) => {
    return (
      <div className={`catalog ${!props.products.length ? 'catalog--loading' : ''}`}>
        {
          props.products.length ?
          <ul className='catalog-list'>
            {
              props.products.map((item: IProduct) => (
                <li
                  key={item.id}
                  className='catalog-list__item'
                >
                  <ProductCard
                    model={item}
                    addToFavorites={props.addToFavorites}
                  />
                </li>
              ))
            }
          </ul>
          :
          <Loader />
        }
      </div>
    );
};
