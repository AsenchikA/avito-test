import React from 'react';
import { IFilterListState } from '../../models/models';
import './FilterList.scss';

interface IFilterListProps {
  filterProducts(filters: IFilterListState): void;
}

const categotyList = [
  {
    name: 'immovable',
    title: 'Недвижимость',
  },
  {
    name: 'cameras',
    title: 'Фотоаппараты',
  },
  {
    name: 'auto',
    title: 'Автомобили',
  },
  {
    name: 'laptops',
    title: 'Ноутбуки',
  },
];

export class FilterList extends React.Component<IFilterListProps, IFilterListState> {
  public state = {
    category: '',
    isFavorites: false,
    maxPrice: 0,
    minPrice: 0,
  };

  private filtersChangeDebounceTimerId: number = 0;

  public render() {
    const { category, minPrice, maxPrice, isFavorites } = this.state;

    return (
      <ul className='filters-list'>
        <li className='filters-category'>
          <h3 className='filters-category__title'>Категория</h3>
          <ul className='filters-category__list'>
            {
              categotyList.map((categoryItem) => (
                <li
                  key={categoryItem.name}
                  data-name={categoryItem.name}
                  onClick={this.onCategoryClick}
                  className={
                    `filters-category__item
                    ${categoryItem.name === category ? 'filters-category__item--active' : ''}
                    `
                  }
                >
                  {categoryItem.title}
                </li>
              ))
            }
          </ul>
        </li>
        <li className='filters-category'>
          <h3 className='filters-category__title'>Цена</h3>
          <div className='filters-category__content'>
            <span className='filters-category__price-caption'>от</span>
            <input
              type='number'
              value={minPrice ? minPrice : ''}
              onChange={this.onMinPriceChange}
              className='filters-category__price-value'
            />
            <span className='filters-category__price-caption'>до</span>
            <input
              type='number'
              value={maxPrice ? maxPrice : ''}
              onChange={this.onMaxPriceChange}
              className='filters-category__price-value'
            />
          </div>
        </li>
        <li className='filters-category'>
          <h3
            className={`
              filters-category__title filters-category__title--favorite
              ${isFavorites ? 'filters-category__title--favorite-check' : ''}
            `}
            onClick={this.onFavoriteClick}
          >
            Избранное
            <i className='filters-category__favorite-icon' />
          </h3>
        </li>
      </ul>
    );
  }
  private onCategoryClick = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    const {
      currentTarget: {
        dataset: {
          name,
        },
      },
    } = event;
    if (name) {
      this.setState({ category: name }, () => {
        this.props.filterProducts(this.state);
      });
    }
  }

  private onMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ minPrice: Number(event.currentTarget.value) }, () => {
      this.onPriceChange();
    });
  }

  private onMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ maxPrice: Number(event.currentTarget.value) }, () => {
      this.onPriceChange();
    });
  }

  private onPriceChange = () => {
    clearTimeout(this.filtersChangeDebounceTimerId);

    this.filtersChangeDebounceTimerId = window.setTimeout(() => {
      this.props.filterProducts(this.state);
    }, 500);
  }

  private onFavoriteClick = () => {
    this.setState((prevState) => ({
      isFavorites: !prevState.isFavorites,
    }), () => {
      this.props.filterProducts(this.state);
    });
  }
}
