import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { articles } from './articles';
import { shows } from './shows';
import { interested } from './interested';
import { shop } from './shop';
import { cart } from './cart';

const config = {
    key: 'root',
    storage,
    debug: true
}

export const ConfigureStore = () => {
    const store = createStore(
        persistCombineReducers(config, {
            articles,
            shows,
            interested,
            shop,
            cart
        }),
        applyMiddleware(thunk, logger)
    );

    const persistor = persistStore(store);

    return { persistor, store };
}