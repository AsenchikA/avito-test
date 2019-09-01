import React from 'react';
import { IProduct } from '../../models/models';
import { ProductCard } from '../product-card/ProductCard';
import './Catalog.scss';

interface ICatalogProps {
  products: IProduct[];
  addToFavorites(id: string): void;
}

export const Catalog = (props: ICatalogProps) => {
    return (
      <ul className='catalog'>
        {
          props.products.map((item: IProduct) => (
            <li
              key={item.id}
              className='catalog__item'
            >
              <ProductCard
                model={item}
                addToFavorites={props.addToFavorites}
              />
            </li>
          ))
        }
      </ul>
    );
};
