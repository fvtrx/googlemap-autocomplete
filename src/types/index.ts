export interface IGoogleMapLatLng {
  lat: any;
  lng: any;
}

export interface IGoogleMapProps {
  location: IGoogleMapLatLng;
  setSelectedMapLocation: (payload: IGoogleMapLatLng) => void;
  getLocationState: () => void;
}

export interface IGoogleMapLocItem {
  place_id: string;
  description: string;
}
