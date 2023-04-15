import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { BiSearch } from "react-icons/bi";

interface PlaceProps {
  place: google.maps.LatLngLiteral | undefined;
  setPlace: (place: google.maps.LatLngLiteral) => void;
}

const Place = ({ place, setPlace }: PlaceProps) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete>();

  const handlePlaceSelect = () => {
    const getPlace = autocomplete?.getPlace();
    if (getPlace?.geometry?.location) {
      const { lat, lng } = getPlace.geometry.location.toJSON();
      setPlace({ lat, lng });
    }
  };

  const onLoad = (autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
  };

  return (
    <div className="flex flex-col h-full p-3 md:p-5 mt-5">
      <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-5">
        Looking for Place?
      </h1>
      <div className="flex items-center w-full h-12 px-4 bg-slate-900 rounded-md">
        <BiSearch className="text-sm md:text-xl text-slate-300" />
        <Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
          <input
            type="text"
            placeholder="Search for a place"
            className="md:w-full md:px-4 py-2 md:ml-2 text-xs md:text-base bg-transparent border-none outline-none text-slate-100 placeholder-slate-300"
          />
        </Autocomplete>
      </div>
      {!place && (
        <p className="text-xs md:text-base text-slate-100 mt-5">
          Please enter a place name to get started.
        </p>
      )}
    </div>
  );
};

export default Place;
