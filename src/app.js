import React from 'react';
import ReactDOM from 'react-dom';
import HelloWorld from './components/exampleComponent';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import store from './store';
import { Router, Route, browserHistory } from 'react-router';

const app = document.getElementById('app');

// Render app
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path="/" component={HelloWorld} />
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
                <Route path="/" component={HelloWorld} />
            </Router>
        </AppContainer>,
    app);
  });
}
