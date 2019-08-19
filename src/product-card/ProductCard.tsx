import React from 'react';
import './ProductCard.scss';

export const ProductCard = () => {
  return (
    <div className='product-card'>
      <img
        src='https://rozetked.me/images/uploads/dwoilp3BVjlE.jpg'
        alt='Фото товара'
        className='product-card__photo'
      />
      <div className='product-card__info'>
        <span className='product-card__name'>Кот чеширский</span>
        <span className='product-card__price'>
          <span className='product-card__price-value'>Бесценно</span>
          <span>, &#8381;</span>
        </span>
        <div className='product-card__seller'>
          <span className='product-card__seller-name'>Диллер котиков</span>
          <span>, </span>
          <span className='product-card__seller-rating'>10.0</span>
        </div>
        <div className='favorites'>Избранное</div>
      </div>
    </div>
  );
};
