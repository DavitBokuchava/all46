import { createStore, applyMiddleware, compose } from 'redux';

import thunkMiddleware from 'redux-thunk';
import rootReducers from '../reducers/reducers';

//export const store = createStore(rootReducers)

export default function confStore() {
  const composeEnhancers =

    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  return createStore(
    rootReducers,
    composeEnhancers(
      applyMiddleware(
        thunkMiddleware
      )
    )
  )

}
