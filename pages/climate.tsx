// Climate page
import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from "@/components/Map";
import Layout from "@/components/layout/Layout";

type googleMapsApiKey = string;

const Climate = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env
      .NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as googleMapsApiKey,
    libraries: ["places"],
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <Map />
    </Layout>
  );
};

export default Climate;
