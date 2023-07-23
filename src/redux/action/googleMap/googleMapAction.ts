import { IGoogleMapLatLng } from "@types";
import { action } from "typesafe-actions";

export enum IMapLocationActionType {
  GET_LOCATION = "map-location/GET_LOCATION",
  SET_SELECTED_LOCATION = "map-location/SET_SELECTED_LOCATION",
  CLEAR_SELECTED_LOCATION = "map-location/CLEAR_SELECTED_LOCATION",
}

export const getLocation = () => action(IMapLocationActionType.GET_LOCATION);
export const setSelectedLocation = (payload: IGoogleMapLatLng) =>
  action(IMapLocationActionType.SET_SELECTED_LOCATION, payload);
export const clearSelectedLocation = () =>
  action(IMapLocationActionType.CLEAR_SELECTED_LOCATION);
