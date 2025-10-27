import { Resend } from "resend";
import { ENV } from "./env.js";

// Use the resendClient to send emails
export const resendClient = new Resend(ENV.RESEND_API_KEY);
// Senders information
export const sender = {
  email: ENV.EMAIL_FROM,
  name: ENV.EMAIL_FROM_NAME,
};
