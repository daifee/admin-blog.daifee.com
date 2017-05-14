import React from 'react';
import AppRouter from './AppRouter';
import {Provider} from 'react-redux';
import store from './store';


export default function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}
