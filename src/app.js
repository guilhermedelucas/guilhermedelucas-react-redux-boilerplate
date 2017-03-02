import React from 'react';
import ReactDOM from 'react-dom';
import Catalog from './components/Catalog';
import Article from './components/Article';
import Checkout from './components/Checkout';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { fetchCart } from './actions/articleActions';
import store from './store';
import { Router, Route, browserHistory } from 'react-router';

const app = document.getElementById('app');

// Render app
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={Catalog} />
                <Route path="/article/:sku" component={Article} />
                <Route path="/checkout/cart" component={Checkout} />

            </Router>
        </Provider>
    </AppContainer>,
    app);

// Hot module reloading
if (module.hot) {
  module.hot.accept('./components/Catalog', () => {
    ReactDOM.render(
        <AppContainer>
            <Router history={browserHistory}>
                <Route path="/" component={Catalog} />
                <Route path="/article/:sku" component={Article} />
            </Router>
        </AppContainer>,
    app);
  });
}
