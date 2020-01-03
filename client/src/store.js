import { createStore, applyMiddleware } from "redux"; // allows use of thunk middleware
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // middleware
import rootReducer from "./reducers"; // the combined reducers

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
