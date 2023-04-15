import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { BiSearch } from "react-icons/bi";

interface PlacesProps {
  startPlace: google.maps.LatLngLiteral | undefined;
  setStartPlace: (place: google.maps.LatLngLiteral) => void;
  endPlace: google.maps.LatLngLiteral | undefined;
  setEndPlace: (place: google.maps.LatLngLiteral) => void;
}

const Places = ({
  startPlace,
  setStartPlace,
  endPlace,
  setEndPlace
}: PlacesProps) => {
  const [startAutocomplete, setStartAutocomplete] = useState<
    google.maps.places.Autocomplete
  >();
  const [endAutocomplete, setEndAutocomplete] = useState<
    google.maps.places.Autocomplete
  >();

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
    <div className="flex flex-col h-full p-3 md:p-5 mt-5">
      <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-5">
        Starting Point
      </h1>
      <div className="flex items-center w-full h-12 px-4 bg-slate-900 rounded-md">
        <BiSearch className="text-sm md:text-xl text-slate-300" />
        <Autocomplete onLoad={onStartLoad} onPlaceChanged={handleStartPlaceSelect}>
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

      {!startPlace && (
        <p className="text-xs md:text-base text-slate-100 mt-5">
          Please enter a starting point to get started.
        </p>
      )}

      {!endPlace && (
<p className="text-xs md:text-base text-slate-100 mt-5">
Please enter a destination to get started.
</p>
)}
</div>
);
};

export default Places;
