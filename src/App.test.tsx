import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from '.';
import { AppContainer } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><AppContainer /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
