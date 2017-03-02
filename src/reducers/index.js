import { combineReducers } from 'redux';

import catalog from './catalogReducers';
import article from './articleReducers';
import cart from './cartReducers';

export default combineReducers({
    catalog, article, cart
})
