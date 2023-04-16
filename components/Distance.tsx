import React, { useEffect, useState } from "react";
import { Emission } from "@/types/emission";
interface DistanceProps {
  leg: google.maps.DirectionsLeg;
  travelMode: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";
  mpg: number;
}

const Distance = ({ leg, travelMode, mpg }: DistanceProps) => {
  console.log("leg", leg);
  const [emission, setEmission] = useState<Emission>();
  console.log({ emission, mpg });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/emission", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distance: leg.distance?.text,
          mpg: mpg,
          gasType: "gasoline", // replace with the actual gas type
        }),
      });

      console.log("response", response);

      if (response.ok) {
        const data = await response.json();
        setEmission(data.emission);
        console.log("data from distance", data);
      } else {
        console.error("Error fetching emission data:", response.statusText);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-3 md:p-5 tracking-widest">
      <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-5">
        Distance
      </h1>
      <div className="text-gray-100 text-base break-words mb-5">
        {leg.start_address} to {leg.end_address}
        <p className="my-1"></p>
        <br />
        This {travelMode.toLowerCase()} trip is{" "}
        <span className="font-bold text-red-400">{leg.distance?.text}</span>{" "}
        from your starting location to your destination. That would take{" "}
        <span className="font-bold text-red-400">{leg.duration?.text}</span>{" "}
        each way.
      </div>
      <h1 className="text-sm md:text-2xl font-bold text-slate-100 mb-5">
        Carbon Emissions
      </h1>
      {emission ? (
        <div className="text-gray-100 text-base break-words mb-5">
          Your CO2 grams total is {emission.c02GramsTotal} for{" "}
          {leg.distance?.text}.
        </div>
      ) : (
        <div className="text-gray-100 text-base break-words mb-5">
          Please enter the form above to calculate your emissions.
        </div>
      )}
    </div>
  );
};

export default Distance;
