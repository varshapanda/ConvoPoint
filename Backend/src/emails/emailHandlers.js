const { resendClient, sender } = require("../lib/resend.js")
const createWelcomeEmailTemplate = require("./emailTemplate.js")

const sendWelcomeEmail = async(email, name, clientURL)=>{
    const {data, error} = await resendClient.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to: email,
        subject: "Welcome to ConvoPoint!",
        html: createWelcomeEmailTemplate(name, clientURL),
    })
    if(error){
        console.error("Error sending welcome email: ", error);
        throw new error("Failed to send welcome email")
    }
    console.log("Welcome Email sent successfully", data);
}

module.exports = sendWelcomeEmail;