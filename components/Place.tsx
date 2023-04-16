import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { BiSearch } from "react-icons/bi";
import Image from "next/image";

interface PlacesProps {
  setStartPlace: (place: google.maps.LatLngLiteral) => void;
  setEndPlace: (place: google.maps.LatLngLiteral) => void;
  travelMode: google.maps.TravelMode;
  setTravelMode: (mode: google.maps.TravelMode) => void;
  mpg: number;
  setMpg: (mpg: number) => void;
  gasType: string;
  setGasType: (gasType: string) => void;
  isOpen: Boolean;
  setIsOpen: (isOpen: Boolean) => void;
}

const Places = ({
  setStartPlace,
  setEndPlace,
  travelMode,
  setTravelMode,
  mpg,
  setMpg,
  gasType,
  setGasType,
  isOpen,
  setIsOpen,
}: PlacesProps) => {
  const [startAutocomplete, setStartAutocomplete] =
    useState<google.maps.places.Autocomplete>();
  const [endAutocomplete, setEndAutocomplete] =
    useState<google.maps.places.Autocomplete>();

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
    <div
      className={`relative mt-5 ${
        isOpen
          ? `min-h-[75px]`
          : `min-h-[520px]  ${
              travelMode === "DRIVING"
                ? "sm:min-h-[560px] transition-all ease-in-out"
                : "min-h-[340px] sm:min-h-[440px]  transition-all ease-in-out"
            }`
      }`}
    >
      <div
        className="flex flex-row justify-between items-center py-2 px-3 md:px-5 w-full sm:w-3/5 lg:w-1/2 mx-auto border-y-[1px] border-slate-500 text-white text-2xl font-semibold z-[1]"
        onClick={() => setIsOpen(!isOpen)}
      >
        <p>Configure Location</p>
        <Image
          src="/dropdown.png"
          className={isOpen ? "transition-all" : "rotate-180 transition-all"}
          alt="carbon emission image"
          width="50"
          height="50"
        />
      </div>
      <div
        className={
          isOpen
            ? "flex flex-col px-3 md:px-5 w-full sm:w-3/5 lg:w-1/2 absolute left-1/2 translate-x-[-50%] -top-[550px] transition-all ease-in-out"
            : "flex flex-col px-3 md:px-5 w-full sm:w-3/5 lg:w-1/2 absolute left-1/2 translate-x-[-50%] top-[5rem] ease-in-out transition-all"
        }
      >
        <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-2 md:mb-5">
          Starting Point
        </h1>
        <div className="flex items-center w-full h-12 px-4 bg-white text-black rounded-md">
          <BiSearch className="text-sm md:text-xl text-black" />
          <Autocomplete
            onLoad={onStartLoad}
            onPlaceChanged={handleStartPlaceSelect}
          >
            <input
              type="text"
              placeholder="Enter Starting Point"
              className="md:w-full md:px-4 placeholder-opacity-50 py-2 md:ml-2 text-xs md:text-base bg-transparent border-none outline-none text-black placeholder-black"
            />
          </Autocomplete>
        </div>

        <h1 className="text-sm md:text-2xl font-bold text-slate-100 my-2 md:my-5">
          Destination
        </h1>
        <div className="flex items-center w-full h-12 px-4 bg-white rounded-md">
          <BiSearch className="text-sm md:text-xl text-black" />
          <Autocomplete
            onLoad={onEndLoad}
            onPlaceChanged={handleEndPlaceSelect}
          >
            <input
              type="text"
              placeholder="Enter Destination"
              className="md:w-full md:px-4 placeholder-opacity-50  py-2 md:ml-2 text-xs md:text-base bg-transparent border-none outline-none text-black placeholder-black"
            />
          </Autocomplete>
        </div>

        {/* Add select element for travel mode */}
        <div>
          <label
            htmlFor="travel-mode-select"
            className="block my-2 md:my-5 text-sm md:text-2xl font-bold text-white"
          >
            Travel Mode:
          </label>
          <select
            id="travel-mode-select"
            value={travelMode}
            onChange={handleTravelModeChange}
            className="w-full h-12 text-opacity-50 px-4 py-2 text-xs md:text-base border-none outline-none text-black placeholder-black bg-white rounded-md"
          >
            <option className="bg-white" value="DRIVING">
              Driving
            </option>
            <option className="bg-white" value="WALKING">
              Walking
            </option>
            <option className="bg-white" value="BICYCLING">
              Bicycling
            </option>
            <option className="bg-white" value="TRANSIT">
              Transit
            </option>
          </select>
          {travelMode === "DRIVING" ? (
            <div className="flex flex-col md:flex-row">
              <div className="basis-1/2 md:mr-1">
                <label className="block my-2 md:my-5 text-sm md:text-2xl font-bold text-white">
                  Miles per Gallon
                </label>
                <input
                  className="w-full h-12 px-4 py-2 text-xs md:text-base border-none outline-none text-black placeholder-black bg-white rounded-md"
                  type="number"
                  value={mpg}
                  onChange={(e) => {
                    setMpg(Number(e.target.value));
                  }}
                />
              </div>
              <div className="basis-1/2 md:ml-1">
                <label className="block my-2 md:my-5 text-sm md:text-2xl font-bold text-white">
                  Gas Type
                </label>
                <select
                  value={gasType}
                  onChange={(e) => {
                    setGasType(e.target.value);
                  }}
                  className="w-full h-12 px-4 py-2 text-xs md:text-base border-none outline-none text-black placeholder-black bg-white rounded-md"
                >
                  <option className="bg-white" value="gasoline">
                    Gasoline
                  </option>
                  <option className="bg-white" value="diesel">
                    Diesel
                  </option>
                </select>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Places;
