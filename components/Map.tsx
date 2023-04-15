import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { decode } from "@googlemaps/polyline-codec";

import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  Circle,
  MarkerClusterer,
  DirectionsService,
  Polyline,
} from "@react-google-maps/api";

import Places from "./Place";
import Distance from "./Distance";
// import { generatePlaces } from "@/utilities/generatePlaces";

// useful types which belong to google.maps
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [startPlace, setStartPlace] = useState<LatLngLiteral>();
  const [endPlace, setEndPlace] = useState<LatLngLiteral>();
  const [routeLine, setRouteLine] = useState<LatLngLiteral[]>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [travelMode, setTravelMode] = useState<
    "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT"
  >("DRIVING");

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

  useMemo(() => {
    if (startPlace && endPlace) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPlace,
          destination: endPlace,
          travelMode: travelMode as google.maps.TravelMode,
        },
        (response, status) => {
          if (status === "OK" && response) {
            console.log("Should be empty", routeLine);
            setDirections(response);
            console.log("response", directions);
            const decodedPolyline = decode(
              response?.routes[0].overview_polyline!
            );
            const newRouteLine = decodedPolyline.map((coord) => ({
              lat: coord[0],
              lng: coord[1],
            }));

            setRouteLine(newRouteLine);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startPlace, endPlace, travelMode]);

  useEffect(() => {
    if (startPlace && endPlace) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPlace,
          destination: endPlace,
          travelMode: travelMode as google.maps.TravelMode,
        },
        (response, status) => {
          if (status === "OK" && response) {
            console.log("Should be empty", routeLine);
            setDirections(response);
            console.log("directions", directions);
            const decodedPolyline = decode(
              response?.routes[0].overview_polyline!
            );
            const newRouteLine = decodedPolyline.map((coord) => ({
              lat: coord[0],
              lng: coord[1],
            }));

            setRouteLine(newRouteLine);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
  }, [travelMode, startPlace, endPlace]);

  const center = useMemo(() => currentLocation, [currentLocation]);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "a8b1b9e035f2bb8b",
    }),
    []
  );

  const getDirections = (
    startPlace: LatLngLiteral,
    endPlace: LatLngLiteral,
    travelMode: google.maps.TravelMode
  ): Promise<DirectionsResult> => {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: startPlace,
          destination: endPlace,
          travelMode,
        },
        (response, status) => {
          if (status === "OK") {
            const decodedPolyline = decode(
              response?.routes[0].overview_polyline!
            );
            const mappedRouteline = decodedPolyline.map((coord) => ({
              lat: coord[0],
              lng: coord[1],
            }));
            setRouteLine(mappedRouteline);

            resolve(response as DirectionsResult);
          } else {
            reject(`Directions request failed due to ${status}`);
          }
        }
      );
    });
  };

  const drawPolyLine = (routeLine: LatLngLiteral[]) => {
    return (
      <Polyline
        path={routeLine}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }}
      />
    );
  };

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <>
      <div className="flex min-h-screen">
        {/* Place section including input box */}
        <div className="w-[40%] md:w-2/5 bg-slate-800">
          <Places
            startPlace={startPlace}
            setStartPlace={(position) => {
              setStartPlace(position);
              mapRef.current?.panTo(position);
            }}
            endPlace={endPlace}
            setEndPlace={(position) => {
              setEndPlace(position);
              mapRef.current?.panTo(position);
            }}
            travelMode={travelMode as google.maps.TravelMode}
            setTravelMode={(mode) => {
              setTravelMode(mode);
            }}
          />
          {directions && (
            <Distance
              leg={directions.routes[0].legs[0]}
              travelMode={travelMode}
            />
          )}
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
            <Marker
              position={startPlace}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              title="Starting Point"
              onClick={() => {
                console.log("clicked");
              }}
            />
          )}
          {/* Marker */}
          {endPlace && (
            <Marker
              position={endPlace}
              icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
              title="Destination"
            />
          )}
          ;{/* Directions */}
          {/* {startPlace && endPlace  && (
          getDirections(startPlace, endPlace, travelMode as google.maps.TravelMode)
        )};
        {routeLine && (
          drawPolyLine(routeLine)
        )}; */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                polylineOptions: {
                  strokeColor: "#1976D2",
                  zIndex: 50,
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </div>
    </>
  );
};

export default Map;
