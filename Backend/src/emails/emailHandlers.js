import { sendgridClient, sender } from "../lib/sendgrid.js";
import {
  createWelcomeEmailTemplate,
  createVerificationEmailTemplate,
} from "./emailTemplate.js";

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

export const sendVerificationEmail = async (email, name, token, clientURL) => {
  const msg = {
    to: email,
    from: {
      email: sender.email,
      name: sender.name,
    },
    subject: "Verify Your Email - ConvoPoint",
    html: createVerificationEmailTemplate(name, token, clientURL),
  };

  try {
    await sendgridClient.send(msg);
    console.log("Verification Email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending verification email:", error);
    if (error.response) {
      console.error("SendGrid error details:", error.response.body);
    }
    throw new Error("Failed to send verification email");
  }
};
