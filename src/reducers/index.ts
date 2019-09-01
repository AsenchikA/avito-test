import { combineReducers } from 'redux';
import { IProduct } from '../models/models';
import { filteredProducts } from './filtered-products';
import { products } from './products';

export const rootReducer = combineReducers({
  filteredProducts,
  products,
});

export interface IRootState {
  filteredProducts: IProduct[];
  products: IProduct[];
}
