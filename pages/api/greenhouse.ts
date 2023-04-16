// Importing the required types from Next.js
import type { NextApiRequest, NextApiResponse } from "next";

// Defining the structure of the response data
type Data = {
  emission:
    | any
    | {
        c02GramsPerMile: number;
        c02GramsTotal: number;
        gasType: string;
      };
};

// A helper function to calculate greenhouse gas emissions
// based on the type and the amount of gas used when driving
const calculateEmission = (mpg: number, gasType: string, distance: number) => {
  let c02PerMile: number = 0;

  // Calculate the CO2 emissions based on the type of gas
  switch (gasType) {
    case "gasoline":
      c02PerMile = Math.ceil(8887 / mpg);
      return {
        c02GramsPerMile: c02PerMile,
        c02GramsTotal: c02PerMile * distance,
        c02BikeTotal: distance * 32,
        c02WalkingTotal: distance * 17,
        gasType: "Gasoline",
      };
    case "diesel":
      c02PerMile = Math.ceil(10180 / mpg);
      return {
        c02GramsPerMile: c02PerMile,
        c02GramsTotal: c02PerMile * distance,
        c02BikeTotal: distance * 32,
        c02WalkingTotal: distance * 17,
        gasType: "Diesel",
      };
    default:
      break;
  }
};

// The API route handler function
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Extract the required input values from the request body
    const { distance, mpg, gasType } = req.body;

    // Calculate the greenhouse gas emissions
    const results = calculateEmission(mpg, gasType, distance);
    console.log(results);

    // Send the calculated emissions as the response data
    res.status(200).json({ emission: results });
  }
}
