import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { articles } from './articles';
import { shows } from './shows';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            articles,
            shows
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}