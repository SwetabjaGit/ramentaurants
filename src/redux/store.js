import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import dataReducer from './reducers/dataReducer';
import uiReducer from './reducers/uiReducer';

const initialState = {};

const middleware = [thunk];

const reducers = combineReducers({
  data: dataReducer,
  UI: uiReducer
});

let composeMiddleware = 
  process.env.NODE_ENV === 'development'
  ? compose(
      applyMiddleware(...middleware),
      process.env.NODE_ENV === 'development' && (
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      )
	) : (
    compose(applyMiddleware(...middleware))
  );

const store = createStore(
	reducers,
  initialState,
	composeMiddleware
);

export default store;

