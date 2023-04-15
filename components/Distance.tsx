import React from "react";

interface DistanceProps {
  leg: google.maps.DirectionsLeg;
  travelMode: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";
}

const Distance = ({ leg, travelMode }: DistanceProps) => {
  console.log("leg", leg);
  return (
    <div className="p-3 md:p-5 tracking-widest">
      <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-5">
        Distance
      </h1>
      <p className="text-gray-100 text-base break-words">
        {leg.start_address} to {leg.end_address}
        <p className="my-1"></p>
        <br />
        This {travelMode.toLowerCase()} trip is{" "}
        <span className="font-bold text-red-400">{leg.distance?.text}</span>{" "}
        from your starting location to your destination. That would take{" "}
        <span className="font-bold text-red-400">{leg.duration?.text}</span>{" "}
        each way.
      </p>
    </div>
  );
};

export default Distance;
