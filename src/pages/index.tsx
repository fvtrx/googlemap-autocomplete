import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import { GoogleMap, MarkerF, useLoadScript } from "@react-google-maps/api";
import {
  getLocation,
  setSelectedLocation,
} from "@redux/action/googleMap/googleMapAction";
import { IAppRootState } from "@redux/reducers";
import { getSelectedLocationState } from "@redux/reducers/googleMap/googleMapReducer";
import { IGoogleMapLatLng, IGoogleMapProps } from "@types";
import { Space, Typography } from "antd";
import Head from "next/head";
import { useMemo } from "react";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

function HomeScreen(props: IGoogleMapProps) {
  const { Title } = Typography;
  const selectedLocation = useSelector(getSelectedLocationState);

  const Map = () => {
    const center = useMemo(() => ({ lat: 3.1319, lng: 101.6841 }), []);

    return (
      <>
        <div className="places-container">
          <PlacesAutocomplete setSelected={props.setSelectedMapLocation} />
        </div>

        <GoogleMap
          zoom={selectedLocation ? 13 : 12}
          center={selectedLocation ? selectedLocation : center}
          mapContainerClassName="map-container"
        >
          {selectedLocation && <MarkerF position={selectedLocation} />}
        </GoogleMap>
      </>
    );
  };

  const PlacesAutocomplete = ({ setSelected }: any) => {
    const {
      clearSuggestions,
      ready,
      value,
      setValue,
      suggestions: { status, data },
    } = usePlacesAutocomplete();

    const handleSelect = async (address: any) => {
      setValue(address, false);
      clearSuggestions();

      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
    };

    return (
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={!ready}
          className="combobox-input"
          placeholder="Search an address"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ place_id, description }) => (
                <ComboboxOption
                  style={{ color: "#000" }}
                  key={place_id}
                  value={description}
                />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    );
  };

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>Google Map AutoComplete</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Space direction="vertical" style={{ width: "100%" }} size={[0, 48]}>
        <Title style={{ color: "white", textAlign: "center" }}>
          Google Map Locator
        </Title>
        <Map />
      </Space>
    </>
  );
}

const mapStateToProps = (state: IAppRootState) => ({
  selectedLocation: state.googleMap.selectedLocation,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getLocationState: () => dispatch(getLocation()),
  setSelectedMapLocation: (payload: IGoogleMapLatLng) =>
    dispatch(setSelectedLocation(payload)),
});

//@ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
