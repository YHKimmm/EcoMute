import React, { useEffect, useState } from "react";
import { Emission } from "@/types/emission";
interface DistanceProps {
  leg: google.maps.DirectionsLeg;
  travelMode: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";
  mpg: number;
  gasType: string;
  isOpen: Boolean;
  setIsOpen: (isOpen: Boolean) => void;
}

const Distance = ({
  leg,
  travelMode,
  mpg,
  gasType,
  isOpen,
  setIsOpen,
}: DistanceProps) => {
  console.log("leg", leg);
  const [emission, setEmission] = useState<Emission>();
  console.log({ emission, mpg, gasType });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/greenhouse", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distance: leg.distance?.value! * 0.000621371, // convert meters into miles
          mpg: mpg,
          gasType: gasType,
        }),
      });

      console.log("response", response);

      if (response.ok) {
        const data = await response.json();
        console.log("data from distance", data);
        setEmission(data.emission);
      } else {
        console.error("Error fetching emission data:", response.statusText);
      }
    };

    fetchData();
  }, [gasType, leg.distance?.value, mpg]);

  return (
    <div
      className={
        isOpen
          ? "transition-all ease-in-out px-3 md:px-5 tracking-widest"
          : "transition-all ease-in-out mt-[20rem] px-3 md:px-5 tracking-widest"
      }
    >
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
          Your total CO2 emission is{" "}
          <span className="font-bold text-red-400">
            {Math.ceil(emission.c02GramsTotal)}
          </span>{" "}
          grams or{" "}
          <span className="font-bold text-red-400">
            {(emission.c02GramsTotal / 1000).toFixed(3)} kg
          </span>{" "}
          for{" "}
          <span className="font-bold text-red-400">{leg.distance?.text}</span>.
          <br /> <br />
          We based our calculations on a{" "}
          <a
            className="hover:underline font-semibold"
            href="https://nepis.epa.gov/Exe/ZyPDF.cgi?Dockey=P100U8YT.pdf"
          >
            paper
          </a>{" "}
          published by the United States Environmental Protection Agency.
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
