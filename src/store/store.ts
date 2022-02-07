import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';

let middleware = applyMiddleware(thunk);

export const store = createStore(reducer, middleware);
