import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { GoogleMap, Marker, DirectionsRenderer } from "@react-google-maps/api";
import Places from "./Place";
import Distance from "./Distance";
import Link from "next/link";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

// useful types which belong to google.maps
type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionsResult = google.maps.DirectionsResult;
type MapOptions = google.maps.MapOptions;

const Map = () => {
  const mapRef = useRef<GoogleMap>();
  const [currentLocation, setCurrentLocation] = useState<LatLngLiteral>();
  const [startPlace, setStartPlace] = useState<LatLngLiteral>();
  const [endPlace, setEndPlace] = useState<LatLngLiteral>();
  const [directions, setDirections] = useState<DirectionsResult>();
  const [travelMode, setTravelMode] = useState<
    "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT"
  >("DRIVING");
  const [mpg, setMpg] = useState<number>(22);
  const [gasType, setGasType] = useState<string>("gasoline");
  const [isOpen, setIsOpen] = useState<Boolean>(true);

  // console.log("place", startPlace, endPlace);

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
            setDirections(response);
            // console.log("directions", directions);
          } else {
            console.error(`Directions request failed due to ${status}`);
          }
        }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [travelMode, startPlace, endPlace]);

  const center = useMemo(() => currentLocation, [currentLocation]);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "a8b1b9e035f2bb8b",
      disableDefaultUI: true,
      zoomControl: true,
    }),
    []
  );

  const onLoad = useCallback((map: any) => (mapRef.current = map), []);

  return (
    <>
      <div className="flex flex-col min-h-screen pt-[120px] md:pt-[80px] bg-slate-800">
        {/* Go back home page */}
        <div className="flex p-5 items-center h-16 text-white">
          <Link href="/">
            <BsFillArrowLeftCircleFill fontSize={30} />
          </Link>
        </div>
        {/* Google Map */}

        <div className="h-[45rem] w-full md:w-3/4 xl:w-3/5 mx-auto z-20">
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
                  // console.log("clicked");
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
            {/* Route Line */}
            {directions && (
              <DirectionsRenderer
                directions={directions}
                options={{
                  polylineOptions: {
                    strokeColor:
                      travelMode === "DRIVING"
                        ? "#FF0000"
                        : travelMode === "WALKING"
                        ? "#00FF00"
                        : travelMode === "BICYCLING"
                        ? "#0000FF"
                        : travelMode === "TRANSIT"
                        ? "#FFFF00"
                        : "",
                    zIndex: 50,
                    strokeWeight: 5,
                  },
                }}
              />
            )}
          </GoogleMap>
        </div>

        {/* Place section including input box */}
        <div>
          {/* Places */}
          <Places
            setStartPlace={(position) => {
              setStartPlace(position);
              mapRef.current?.panTo(position);
            }}
            setEndPlace={(position) => {
              setEndPlace(position);
              mapRef.current?.panTo(position);
            }}
            travelMode={travelMode as google.maps.TravelMode}
            setTravelMode={(mode) => {
              setTravelMode(mode);
            }}
            mpg={mpg}
            setMpg={(mpg: number) => {
              setMpg(mpg);
            }}
            gasType={gasType}
            setGasType={(gasType: string) => {
              setGasType(gasType);
            }}
            isOpen={isOpen}
            setIsOpen={(isOpen: Boolean) => {
              setIsOpen(isOpen);
            }}
          />
          {directions && (
            <Distance
              leg={directions.routes[0].legs[0]}
              travelMode={travelMode}
              mpg={mpg}
              gasType={gasType}
              isOpen={isOpen}
              setIsOpen={(isOpen: Boolean) => {
                setIsOpen(isOpen);
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Map;
