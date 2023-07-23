import {
  IMapLocationActionType,
  getLocation,
} from "@redux/action/googleMap/googleMapAction";
import { fork, put, takeEvery } from "redux-saga/effects";

function* getSelectedLocationState() {
  yield put(getLocation());
}

function* watchGoogleMap() {
  takeEvery(IMapLocationActionType.GET_LOCATION, getSelectedLocationState);
}

const googleMapSaga = [fork(watchGoogleMap)];

export default googleMapSaga;
