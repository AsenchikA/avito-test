import React from 'react';
import { connect } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { actions } from './actions';
import './App.scss';
import { Catalog } from './components/catalog/Catalog';
import { FilterList } from './components/filter-list/FilterList';
import { Sorting } from './components/sorting/Sorting';
import { ESortingTypes } from './enums/enums';
import { IFilterListState, IProduct } from './models/models';
import { IRootState } from './reducers';

interface IMapDispatchToProps {
  getData: () => void;
  filterProducts: (filters: IFilterListState) => void;
  addToFavorites: (id: string) => void;
  setSorting: (sorting: ESortingTypes) => void;
}

interface IMapStateToProps {
  products: IProduct[];
}

type IAppProps = IMapDispatchToProps & IMapStateToProps;

class App extends React.Component<IAppProps> {
  public componentDidMount() {
    this.props.getData();
  }

  public render() {
    const { products, filterProducts, addToFavorites, setSorting } = this.props;
    return (
      <div className='app'>
        <div className='app-container'>
          <aside className='filters'>
            <h2 className='filters__title'>Фильтры</h2>
            <FilterList
              filterProducts={filterProducts}
            />
          </aside>
          <main className='main'>
            <div className='sorting'>
              <h2 className='sorting__title'>Сортировка</h2>
              <Sorting
                onChange={setSorting}
              />
            </div>
            <Catalog
              addToFavorites={addToFavorites}
              products={products}
            />
          </main>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IRootState) => ({
  products: state.filteredProducts,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<IRootState, void, Action>): IMapDispatchToProps => ({
  addToFavorites: (id: string) => dispatch(actions.addToFavorites(id)),
  filterProducts: (filters: IFilterListState) => dispatch(actions.filterProducts(filters)),
  getData: () => dispatch(actions.getData()),
  setSorting: (sorting: ESortingTypes) => dispatch(actions.setSorting(sorting)),
});

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);
