import { actions, IProductsAction } from '../actions';
import { IProduct } from '../models/models';

export const products = (state: IProduct[] = [], action: IProductsAction): IProduct[] => {
  switch (action.type) {
    case actions.types.SET_PRODUCTS:
      return action.payload;
    default:
      return state;
  }
};
