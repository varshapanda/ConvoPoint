import sgMail from "@sendgrid/mail";
import { ENV } from "./env.js";

// Initialize SendGrid with API key
sgMail.setApiKey(ENV.SENDGRID_API_KEY);

export const sendgridClient = sgMail;

// Sender information
export const sender = {
  email: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME,
};
