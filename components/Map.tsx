import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
} from "@react-google-maps/api";

// useful types
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();

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
    <div>
      <GoogleMap
        zoom={10}
        center={center}
        mapContainerClassName="map-container"
        options={options}
        onLoad={onLoad}
      ></GoogleMap>
    </div>
  );
};

export default Map;
