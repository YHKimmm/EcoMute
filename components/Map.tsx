import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Place";
import { generatePlaces } from "@/utilities/generatePlaces";
import Header from "@/components/Header";

// useful types which belong to google.maps
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [startPlace, setStartPlace] = useState<LatLngLiteral>();
  const [endPlace, setEndPlace] = useState<LatLngLiteral>();

  console.log("place", startPlace, endPlace);

  // const generatedPlaces = useMemo(() => {
  //   return generatePlaces(place);
  // }, [place]);

  // get current location of user
  useEffect(() => {
    if (typeof window !== undefined && typeof google !== undefined) {
      navigator.geolocation.getCurrentPosition(
        ({ coords: { latitude, longitude } }) => {
          if (!isNaN(latitude) && !isNaN(longitude)) {
            setCurrentLocation({ lat: latitude, lng: longitude });
          }
        }
      );
    }
  }, []);
  const center = useMemo(() => currentLocation, [currentLocation]);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "a8b1b9e035f2bb8b",
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <><div className="flex min-h-screen">
      {/* Place section including input box */}
      <div className="w-[40%] md:w-1/4 bg-slate-800">
        <Places
          startPlace={startPlace}
          setStartPlace={(position) => {
            setStartPlace(position);
            mapRef.current?.panTo(position);
          } }
          endPlace={endPlace}
          setEndPlace={(position) => {
            setEndPlace(position);
            mapRef.current?.panTo(position);
          } } />
      </div>
      {/* Google Map */}
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      >
        {/* Marker */}
        {startPlace && (
          <>
            <Marker
              position={startPlace}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
            {/* <div>
              {generatedPlaces.map((place, idx) => (
                <Marker key={idx} position={place} />
              ))}
            </div> */}
          </>
        )}
        {/* Marker */}
        {endPlace && (
          <Marker
            position={endPlace}
            icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png" />
        )}

      </GoogleMap>
    </div></>
  );
};

export default Map;
