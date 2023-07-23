import { IMapLocationActionType } from "@redux/action/googleMap/googleMapAction";
import { IAppRootState } from "@redux/reducers";
import { createSelector } from "@reduxjs/toolkit";
import { IGoogleMapLatLng } from "@types";

export interface IState {
  selectedLocation: IGoogleMapLatLng | null;
}

export const initialState: IState = {
  selectedLocation: null,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case IMapLocationActionType.SET_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: {
          lat: action.payload.lat,
          lng: action.payload.lng,
        },
      };
    case IMapLocationActionType.CLEAR_SELECTED_LOCATION:
      return {
        ...state,
        selectedLocation: null,
      };
    default:
      return state;
  }
};

const selectedLocation = (state: IAppRootState) =>
  state.googleMap.selectedLocation;

export const getSelectedLocationState = createSelector(
  [selectedLocation],
  (data) => data
);

export { reducer as googleMapReducer };
