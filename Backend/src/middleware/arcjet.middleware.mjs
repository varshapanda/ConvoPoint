import aj from "../lib/arcjet.mjs";
import {isSpoofedBot} from "@arcjet/inspect";

export default async function arcjetMiddleware (req, res, next){
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ message: "To many requests, please try again later" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ message: "Bot access denied" });
      } else {
        return res.status(403).json({message: "Access Forbidden. Access denied by security policy"});
      }
    }
    // check for spoofed bots - type of bot that acts like human, they are bots but pretend to not
    if(decision.results.some(isSpoofedBot)){
        return res.status(403).json({
            error : "Spoofed bots detected",
            message: "Malicious bot activity detected"
        })
    }
    next();

  } catch (error) {
    console.log("Arcjet middleware error", error);
    next();
  }
};

