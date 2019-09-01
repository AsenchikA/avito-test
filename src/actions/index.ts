import { Dispatch } from 'redux';
import { api } from '../api/api';
import { ESortingTypes } from '../enums/enums';
import { IFilterListState, IInitialProduct, IProduct, ISeller } from '../models/models';
import { IRootState } from '../reducers';

class Actions {
  public types = {
    SET_FILTERED_PRODUCTS: 'SET_FILTERED_PRODUCTS',
    SET_PRODUCTS: 'SET_PRODUCTS',
    SET_SELLERS: 'SET_SELLERS',
  };

  public getData = () => (dispatch: Dispatch) => {
    let favoriteList: string[] = [];
    const favorites: string | null = localStorage.getItem('favorites');
    if (favorites) {
      favoriteList = JSON.parse(favorites);
    }
    api.getProducts()
      .then((productsResponse) => {
        api.getSellers()
          .then((sellersResponse) => {
            const productList: IProduct[] = [];
            productsResponse.data.forEach((defaultProductModel: IInitialProduct) => {
              let product: IProduct = {
                ...defaultProductModel,
                isFavorite: false,
                sellerName: '',
                sellerRating: 0,
              };

              const seller = sellersResponse.data.find((sellerItem: ISeller) => {
                return sellerItem.id === product.relationships.seller;
              });
              product = {
                ...product,
                sellerName: seller.name,
                sellerRating: seller.rating,
              };

              if (favoriteList.find((favorite) => favorite === product.id)) {
                product = {
                  ...product,
                  isFavorite: true,
                };
              }

              productList.push(product);
            });

            productList.sort((a, b) => (a.price - b.price));

            dispatch({
              payload: productList,
              type: this.types.SET_PRODUCTS,
            });
            dispatch({
              payload: productList,
              type: this.types.SET_FILTERED_PRODUCTS,
            });
          });
      });
  }

  public filterProducts = (filters: IFilterListState) => (dispatch: Dispatch, getState: () => IRootState) => {
    let products = [...getState().products];
    if (filters.category) {
      products = products.filter((product) => ( product.category === filters.category ));
    }
    if (filters.minPrice) {
      products = products.filter((product) => ( product.price >= filters.minPrice ));
    }
    if (filters.maxPrice) {
      products = products.filter((product) => ( product.price <= filters.maxPrice ));
    }
    if (filters.isFavorites) {
      products = products.filter((product) => ( product.isFavorite === filters.isFavorites ));
    }
    dispatch({
      payload: products,
      type: this.types.SET_FILTERED_PRODUCTS,
    });
  }

  public addToFavorites = (id: string) => (dispatch: Dispatch, getState: () => IRootState) => {
    const favorites: string | null = localStorage.getItem('favorites');
    const products = [...getState().products];
    const productIndex = products.findIndex((product) => (product.id === id));
    const filteredProducts = [...getState().filteredProducts];
    const filteredProductIndex = filteredProducts.findIndex((product) => (product.id === id));

    if (favorites) {
      const favoriteList = JSON.parse(favorites);
      const favoriteIndex = favoriteList.findIndex((item: string) => item === id);
      if (favoriteIndex !== -1) {
        favoriteList.splice(favoriteIndex, 1);
        products[productIndex] = {
          ...products[productIndex],
          isFavorite: false,
        };
        filteredProducts[filteredProductIndex] = {
          ...filteredProducts[filteredProductIndex],
          isFavorite: false,
        };
      } else {
        favoriteList.push(id);
        products[productIndex] = {
          ...products[productIndex],
          isFavorite: true,
        };
        filteredProducts[filteredProductIndex] = {
          ...filteredProducts[filteredProductIndex],
          isFavorite: true,
        };
      }
      localStorage.setItem('favorites', JSON.stringify(favoriteList));
    } else {
      localStorage.setItem('favorites', JSON.stringify([id]));
      products[productIndex] = {
        ...products[productIndex],
        isFavorite: true,
      };
      filteredProducts[filteredProductIndex] = {
        ...filteredProducts[filteredProductIndex],
        isFavorite: true,
      };
    }
    dispatch({
      payload: products,
      type: this.types.SET_PRODUCTS,
    });
    dispatch({
      payload: filteredProducts,
      type: this.types.SET_FILTERED_PRODUCTS,
    });

  }

  public setSorting = (sorting: ESortingTypes) => (dispatch: Dispatch, getState: () => IRootState) => {
    const products = [...getState().products];
    const filteredProducts = [...getState().filteredProducts];

    switch (sorting) {
      case ESortingTypes.PRICE:
        products.sort((a, b) => (a.price - b.price));
        filteredProducts.sort((a, b) => (a.price - b.price));
        break;
      case ESortingTypes.POPULAR:
        products.sort((a, b) => (b.sellerRating - a.sellerRating));
        filteredProducts.sort((a, b) => (b.sellerRating - a.sellerRating));
        break;
    }
    dispatch({
      payload: products,
      type: this.types.SET_PRODUCTS,
    });
    dispatch({
      payload: filteredProducts,
      type: this.types.SET_FILTERED_PRODUCTS,
    });
  }
}

export const actions = new Actions();

export interface IProductsAction {
  type: 'SET_PRODUCTS';
  payload: IProduct[];
}

export interface ISellersAction {
  type: 'SET_SELLERS';
  payload: ISeller[];
}

export interface IFilteredProducts {
  type: 'SET_FILTERED_PRODUCTS';
  payload: IProduct[];
}
