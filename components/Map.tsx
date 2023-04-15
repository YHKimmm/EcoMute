import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";
import Place from "./Place";
import { generatePlaces } from "@/utilities/generatePlaces";

// useful types which belong to google.maps
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [place, setPlace] = useState<LatLngLiteral>();

  console.log("place", place);

  const generatedPlaces = useMemo(() => {
    return generatePlaces(place);
  }, [place]);

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
    <div className="flex min-h-screen">
      {/* Place section including input box */}
      <div className="w-[40%] md:w-1/4 bg-slate-800">
        <Place
          place={place}
          setPlace={(position) => {
            setPlace(position);
            mapRef.current?.panTo(position);
          }}
        />
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
        {place && (
          <>
            <Marker
              position={place}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
            />
            <div>
              {generatedPlaces.map((place, idx) => (
                <Marker key={idx} position={place} />
              ))}
            </div>
          </>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
