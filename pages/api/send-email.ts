import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'default@example.com';
const apiKey = process.env.SENDGRID_API_KEY;

if (!apiKey) {
  throw new Error('SENDGRID_API_KEY environment variable is not set.');
}

sgMail.setApiKey(apiKey);

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email } = req.body;
  const msg = {
    to: email,
    from: fromEmail,
    subject: "Thanks for subscribing to EcoMute!",
    text: "Thanks for subscribing to our newsletter! This Project was a part of the Hackathon conducted by DevPost for the MEGA Hackathon 2023 and was created by Brayden Kim, Scott Croin, Mason Porter and Renz Gabrinao",
    html: `<p>Thanks for subscribing to our newsletter! This Project was a part of the Hackathon conducted by DevPost for the MEGA Hackathon 2023 and was created by <br />Brayden Kim (braydenkim98@gmail.com), Scott Croin (), Mason Porter (masonrwporter@gmail.com) and Renz Gabrinao (rgabrinao1@gmail.com
        )</p>`,
  };
  
  try {
    await sgMail.send(msg);
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
}
