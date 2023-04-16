import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { BiSearch } from "react-icons/bi";

interface PlacesProps {
  startPlace: google.maps.LatLngLiteral | undefined;
  setStartPlace: (place: google.maps.LatLngLiteral) => void;
  endPlace: google.maps.LatLngLiteral | undefined;
  setEndPlace: (place: google.maps.LatLngLiteral) => void;
  travelMode: google.maps.TravelMode;
  setTravelMode: (mode: google.maps.TravelMode) => void;
}

const Places = ({
  startPlace,
  setStartPlace,
  endPlace,
  setEndPlace,
  travelMode,
  setTravelMode,
}: PlacesProps) => {
  const [startAutocomplete, setStartAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [endAutocomplete, setEndAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [mpg, setMpg] = useState<string>("22");
  const [gasType, setGasType] = useState<string>("");

  // const [travelMode, setTravelMode] = useState<
  //   "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT"
  // >("DRIVING");

  const handleTravelModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setTravelMode(
      event.target.value as
        | "DRIVING"
        | "WALKING"
        | "BICYCLING"
        | "TRANSIT" as google.maps.TravelMode
    );
  };

  const handleStartPlaceSelect = () => {
    const getPlace = startAutocomplete?.getPlace();
    if (getPlace?.geometry?.location) {
      const { lat, lng } = getPlace.geometry.location.toJSON();
      setStartPlace({ lat, lng });
    }
  };

  const handleEndPlaceSelect = () => {
    const getPlace = endAutocomplete?.getPlace();
    if (getPlace?.geometry?.location) {
      const { lat, lng } = getPlace.geometry.location.toJSON();
      setEndPlace({ lat, lng });
    }
  };

  const onStartLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setStartAutocomplete(autocomplete);
  };

  const onEndLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setEndAutocomplete(autocomplete);
  };

  return (
    <div className="flex flex-col p-3 md:p-5">
      <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-5">
        Starting Point
      </h1>
      <div className="flex items-center w-full h-12 px-4 bg-slate-900 rounded-md">
        <BiSearch className="text-sm md:text-xl text-slate-300" />
        <Autocomplete
          onLoad={onStartLoad}
          onPlaceChanged={handleStartPlaceSelect}
        >
          <input
            type="text"
            placeholder="Enter Starting Point"
            className="md:w-full md:px-4 py-2 md:ml-2 text-xs md:text-base bg-transparent border-none outline-none text-slate-100 placeholder-slate-300"
          />
        </Autocomplete>
      </div>

      <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-5 mt-5">
        Destination
      </h1>
      <div className="flex items-center w-full h-12 px-4 bg-slate-900 rounded-md">
        <BiSearch className="text-sm md:text-xl text-slate-300" />
        <Autocomplete onLoad={onEndLoad} onPlaceChanged={handleEndPlaceSelect}>
          <input
            type="text"
            placeholder="Enter Destination"
            className="md:w-full md:px-4 py-2 md:ml-2 text-xs md:text-base bg-transparent border-none outline-none text-slate-100 placeholder-slate-300"
          />
        </Autocomplete>
      </div>

      {/* Add select element for travel mode */}
      <div>
        <label
          htmlFor="travel-mode-select"
          className="block my-5 text-sm md:text-2xl font-bold text-slate-100"
        >
          Travel Mode:
        </label>
        <select
          id="travel-mode-select"
          value={travelMode}
          onChange={handleTravelModeChange}
          className="md:w-full h-12 md:px-4 py-2 text-xs md:text-base border-none outline-none text-slate-100 placeholder-slate-300 bg-slate-900 rounded-md"
        >
          <option className="bg-slate-900" value="DRIVING">
            Driving
          </option>
          <option className="bg-slate-900" value="WALKING">
            Walking
          </option>
          <option className="bg-slate-900" value="BICYCLING">
            Bicycling
          </option>
          <option className="bg-slate-900" value="TRANSIT">
            Transit
          </option>
        </select>
        {travelMode === "DRIVING" ? (
          <>
            <label className="block my-5 text-sm md:text-2xl font-bold text-slate-100">
              Miles per Gallon
            </label>
            <input
              className="md:w-full h-12 md:px-4 py-2 text-xs md:text-base border-none outline-none text-slate-100 placeholder-slate-300 bg-slate-900 rounded-md"
              type="number"
              value={mpg}
              onChange={(e) => {
                setMpg(e.target.value);
              }}
            />
            <label className="block my-5 text-sm md:text-2xl font-bold text-slate-100">
              Gas Type
            </label>
            <select
              value={gasType}
              onChange={(e) => {
                setGasType(e.target.value);
              }}
              className="md:w-full h-12 md:px-4 py-2 text-xs md:text-base border-none outline-none text-slate-100 placeholder-slate-300 bg-slate-900 rounded-md"
            >
              <option className="bg-slate-900" value="gasoline">
                Gasoline
              </option>
              <option className="bg-slate-900" value="diesel">
                Diesel
              </option>
            </select>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* {!startPlace && (
        <p className="text-xs md:text-base text-slate-100 mt-5">
          Please enter a starting point to get started.
        </p>
      )}
      {!endPlace && (
      <p className="text-xs md:text-base text-slate-100 mt-5">
      Please enter a destination to get started.
      </p>
      )} */}
    </div>
  );
};

export default Places;
