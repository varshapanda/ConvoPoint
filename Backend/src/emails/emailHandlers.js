import { sendgridClient, sender } from "../lib/sendgrid.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  const msg = {
    to: email,
    from: {
      email: sender.email,
      name: sender.name,
    },
    subject: "Welcome to ConvoPoint!",
    html: createWelcomeEmailTemplate(name, clientURL),
  };

  try {
    await sendgridClient.send(msg);
    console.log("Welcome Email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
    throw new Error("Failed to send welcome email");
  }
};