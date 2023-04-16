import React, { useEffect, useState } from "react";
import { Emission } from "@/types/emission";
import EmissionResult from "./EmissionResult";
import { isEnumMember } from "typescript";
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
  // console.log("leg", leg);
  const [emission, setEmission] = useState<Emission | undefined>();
  // console.log({ emission, mpg, gasType });

  useEffect(() => {
    const fetchData = async () => {
      if (!leg.distance?.value) {
        setEmission(undefined);
      }
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

      // console.log("response", response);

      if (response.ok) {
        const data = await response.json();
        // console.log("data from distance", data);
        setEmission(data.emission);
      } else {
        console.error("Error fetching emission data:", response.statusText);
      }
    };

    fetchData();
  }, [gasType, leg.distance?.value, mpg]);

  return (
    <div className="px-3 md:px-5 w-full sm:w-3/5 lg:w-1/2 mx-auto">
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
      {mpg === 0 && travelMode === "DRIVING" && (
        <div className="text-gray-100 text-base break-words mb-5">
          <span className="font-bold text-red-400">Note:</span> Your MPG is set
          to 0. This means that you are not using a vehicle for this trip. If
          you are using a vehicle, please change your MPG in the form above.
        </div>
      )}
      {emission ? (
        <div className="text-gray-100 text-base break-words mb-5">
          <EmissionResult
            travelMode={travelMode}
            emission={emission}
            leg={leg}
          />
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
