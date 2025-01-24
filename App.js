import React from 'react';
import ProductScreen from './src/screens/ProductScreen';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <ProductScreen />
    </Provider>
  );
};

export default App;
