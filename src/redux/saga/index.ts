import { all } from "redux-saga/effects";
import googleMapSaga from "./googleMap/googleMapSaga";

export default function* rootSaga() {
  yield all([...googleMapSaga]);
}
