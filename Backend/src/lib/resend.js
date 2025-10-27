const {Resend} = require("resend");
const ENV = require("./env.js")

// Use the resendClient to send emails
const resendClient  = new Resend(ENV.RESEND_API_KEY);
// Senders information
const sender={
    email: ENV.EMAIL_FROM,
    name:ENV.EMAIL_FROM_NAME
}

module.exports = {
    resendClient,
    sender
}

