import React from 'react';
import { IProduct } from '../../models/models';
import './ProductCard.scss';

interface IProductCardProps {
  model: IProduct;
  addToFavorites(id: string): void;
}

export const ProductCard = (props: IProductCardProps) => {

  const formatNumber = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const onFavoritesClick = () => {
    props.addToFavorites(props.model.id);
  };

  return (
    <div className='product-card'>
      <img
        src={props.model.pictures[0]}
        alt='Фото товара'
        className='product-card__photo'
      />
      <div className='product-card__info'>
        <span className='product-card__name'>{props.model.title}</span>
        <span className='product-card__price'>
          <span className='product-card__price-value'>{props.model.price ? formatNumber(props.model.price) : ''}</span>
          <span> &#8381;</span>
        </span>
        <div className='product-card__seller'>
          <span className='product-card__seller-name'>{props.model.sellerName}</span>
          <span>, </span>
          <span className='product-card__seller-rating'>{props.model.sellerRating}</span>
        </div>
        <div
          className={`product-card__favorite ${props.model.isFavorite ? 'product-card__favorite--check' : ''}`}
          onClick={onFavoritesClick}
        >
          <i className='product-card__favorite-icon' />
          Избранное
        </div>
      </div>
    </div>
  );
};
