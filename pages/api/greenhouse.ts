// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  emission:
    | number
    | {
        value: number;
        type: string;
        measurement: string;
      }
    | undefined;
};

// calculates greenhouse gases emissions
// based on the type and the amount of gas used when driving
const calculateEmission = (gallons: string, type: string) => {
  switch (type) {
    case "gasoline":
      return {
        value: 8887 * Number(gallons),
        type: "CO2",
        measurement: "grams",
      };
    case "diesel":
      return {
        value: 10180 * Number(gallons),
        type: "C02",
        measurement: "grams",
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
    const { gallons, type } = req.body;

    const results = calculateEmission(gallons, type);
    console.log(results);

    res.status(200).json({ emission: results });
  }
}
