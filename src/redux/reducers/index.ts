import { combineReducers } from "redux";

import {
  googleMapReducer,
  IState as IGoogleMapStateType,
  initialState as initialGoogleMapState,
} from "@redux/reducers/googleMap/googleMapReducer";

export interface IAppRootState {
  googleMap: IGoogleMapStateType;
}

export const initialState: IAppRootState = {
  googleMap: initialGoogleMapState,
};

export const rootReducer = combineReducers({
  googleMap: googleMapReducer,
});
