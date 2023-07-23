import { applyMiddleware, legacy_createStore as createStore } from "redux";
// import { HYDRATE, createWrapper } from "next-redux-wrapper";
import { rootReducer } from "@redux/reducers";
import rootSaga from "@redux/saga";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

const sagaMiddleware = createSagaMiddleware();
//@ts-ignore
let middlewares: any = [];
middlewares.push(sagaMiddleware);

const configureStore = () => {
  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
  return {
    store,
  };
};

export const { store } = configureStore();

sagaMiddleware.run(rootSaga);
