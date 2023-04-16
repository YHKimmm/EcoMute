import React, { useEffect, useState } from "react";
import { Emission } from "@/types/emission";

interface ResultProps {
  leg: google.maps.DirectionsLeg;
  travelMode: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";
  emission: Emission;
}

const EmissionResult = ({ travelMode, emission, leg }: ResultProps) => {
  switch (travelMode) {
    case "DRIVING":
      return (
        <>
          Your total CO2 emission is{" "}
          <span className="font-bold text-red-400">
            {Math.ceil(emission.c02GramsTotal)}
          </span>{" "}
          grams or{" "}
          <span className="font-bold text-red-400">
            {(emission.c02GramsTotal / 1000).toFixed(3)} kg
          </span>{" "}
          for{" "}
          <span className="font-bold text-red-400">{leg.distance?.text}</span>
          .
          <br /> <br />
          We based our calculations on a{" "}
          <a
            className="hover:underline font-semibold"
            href="https://nepis.epa.gov/Exe/ZyPDF.cgi?Dockey=P100U8YT.pdf"
          >
            paper
          </a>{" "}
          published by the United States Environmental Protection Agency.
        </>
      );
    case "BICYCLING":
      return (
        <>
          Your total CO2 emission is{" "}
          <span className="font-bold text-red-400">
            {Math.ceil(emission.c02BikeTotal)}
          </span>{" "}
          grams or{" "}
          <span className="font-bold text-red-400">
            {(emission.c02BikeTotal / 1000).toFixed(3)} kg
          </span>{" "}
          for{" "}
          <span className="font-bold text-red-400">{leg.distance?.text}</span>
          , taking into account the emissions from manufacturing the bike and
          food consumed by the rider
          <br /> <br />
          We based our calculations on this{" "}
          <a
            className="hover:underline font-semibold"
            href="https://www.bikeradar.com/features/long-reads/cycling-environmental-impact/"
          >
            article
          </a>{" "}
          published by Bike Radar.
        </>
      );
    case "WALKING":
      return (
        <>
          Your total CO2 emission is{" "}
          <span className="font-bold text-red-400">
            {Math.ceil(emission.c02WalkingTotal)}
          </span>{" "}
          grams or{" "}
          <span className="font-bold text-red-400">
            {(emission.c02WalkingTotal / 1000).toFixed(3)} kg
          </span>{" "}
          for{" "}
          <span className="font-bold text-red-400">{leg.distance?.text}</span>.{" "}
          <br /> <br />
          We based our calculations on a{" "}
          <a
            className="hover:underline font-semibold"
            href="https://www.globe.gov/explore-science/scientists-blog/archived-posts/sciblog/index.html_p=186.html"
          >
            paper
          </a>{" "}
          published by the Globe Program Scientists&apos; Blog.
        </>
      );
    case "TRANSIT":
      return (
        <>
          Factoring in Bus and Rail transit CO2 emissions may produce inacurrate
          values, This{" "}
          <a
            className="hover:underline font-semibold"
            href="https://www.cbo.gov/publication/58861"
          >
            article
          </a>{" "}
          published by the Congressional Budget Office of the U.S.A. provides
          more details into average Carbon Dioxide emissions per Passenger-Mile.
        </>
      );
    default:
      return <></>;
  }
};

export default EmissionResult;
