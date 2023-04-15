// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  emission:
    | any
    | {
        c02GramsPerMile: number;
        c02GramsTotal: number;
        gasType: string;
      };
};

// calculates greenhouse gases emissions
// based on the type and the amount of gas used when driving
const calculateEmission = (mpg: number, gasType: string, distance: number) => {
  let c02PerMile: number = 0;
  switch (gasType) {
    case "gasoline":
      c02PerMile = Math.ceil(8887 / mpg);
      return {
        c02GramsPerMile: c02PerMile,
        c02GramsTotal: c02PerMile * distance,
        gasType: "Gasoline",
      };
    case "diesel":
      c02PerMile = Math.ceil(10180 / mpg);
      return {
        c02GramsPerMile: c02PerMile,
        c02GramsTotal: c02PerMile * distance,
        gasType: "Diesel",
      };
    default:
      break;
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { distance, mpg, gasType } = req.body;

    const results = calculateEmission(mpg, gasType, distance);
    console.log(results);

    res.status(200).json({ emission: results });
  }
}
