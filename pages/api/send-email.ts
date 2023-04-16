// Import necessary dependencies
import type { NextApiRequest, NextApiResponse } from "next";
import sgMail from "@sendgrid/mail";

// Get the from email address and SendGrid API key from environment variables
const fromEmail = process.env.SENDGRID_FROM_EMAIL || 'default@example.com';
const apiKey = process.env.SENDGRID_API_KEY;

// If the SendGrid API key is not set, throw an error
if (!apiKey) {
  throw new Error('SENDGRID_API_KEY environment variable is not set.');
}

// Set the SendGrid API key
sgMail.setApiKey(apiKey);

// Define the response data type
type Data = {
  success: boolean;
  message: string;
};

// Define the request handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // Get the email address from the request body
  const { email } = req.body;
  
  // Create the email message
  const msg = {
    to: email,
    from: fromEmail,
    subject: "Thanks for subscribing to EcoMute!",
    text: "Thanks for subscribing to our newsletter! This Project was a part of the Hackathon conducted by DevPost for the MEGA Hackathon 2023 and was created by Brayden Kim, Scott Croin, Mason Porter and Renz Gabrinao",
    html: `<p>Thanks for subscribing to our newsletter! This Project was a part of the Hackathon conducted by DevPost for the MEGA Hackathon 2023 and was created by <br />Brayden Kim (braydenkim98@gmail.com), Scott Croin (scott.c19@live.com
        ), Mason Porter (masonrwporter@gmail.com) and Renz Gabrinao (rgabrinao1@gmail.com
        )</p>`,
  };
  
  try {
    // Send the email using SendGrid
    await sgMail.send(msg);
    // Respond with a success message
    res.status(200).json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    // Log any errors and respond with an error message
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending email." });
  }
}
