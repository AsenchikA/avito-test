import { actions, IFilteredProducts } from '../actions';
import { IProduct } from '../models/models';

export const filteredProducts = (state: IProduct[] = [], action: IFilteredProducts): IProduct[] => {
  switch (action.type) {
    case actions.types.SET_FILTERED_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};
