import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';

export let middleware = applyMiddleware(thunk);

export const store = createStore(reducer, middleware);
