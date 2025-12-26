const escapeHtml = (str) =>
  String(str).replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      }[char])
  );

export const createWelcomeEmailTemplate = (name, clientURL) => {
  const safeName = escapeHtml(name ?? "");
  const safeURL = escapeHtml(clientURL ?? "#");
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to ConvoPoint</title>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #ececec; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0d0d0d;">
    <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 50px 30px;
            text-align: center;
            border-radius: 8px 8px 0 0;
            border: 1px solid #2d2d2d;
            border-bottom: none;">
  <h1 style="color: #ffffff;
             margin: 0;
             font-size: 32px;
             font-weight: 600;
             letter-spacing: -0.5px;">
    Welcome to ConvoPoint!
  </h1>
</div>
    <div style="background-color: #1a1a1a; padding: 40px 35px; border-radius: 0 0 8px 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.5); border: 1px solid #2d2d2d; border-top: none;">
      <p style="font-size: 18px; color: #ffffff; font-weight: 600; margin-bottom: 8px;">Hello ${safeName},</p>
      <p style="color: #b4b4b4; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">We're excited to have you join our messaging platform! ConvoPoint connects you with friends, family, and colleagues in real-time, no matter where they are.</p>
      
      <div style="background-color: #0d0d0d; padding: 28px 24px; border-radius: 8px; margin: 28px 0; border: 1px solid #2d2d2d;">
        <p style="font-size: 15px; margin: 0 0 18px 0; color: #ffffff; font-weight: 600;">Get started in just a few steps:</p>
        <ul style="padding-left: 20px; margin: 0; color: #b4b4b4; font-size: 15px;">
          <li style="margin-bottom: 12px; line-height: 1.5;">Set up your profile picture</li>
          <li style="margin-bottom: 12px; line-height: 1.5;">Find and add your contacts</li>
          <li style="margin-bottom: 12px; line-height: 1.5;">Start a conversation</li>
          <li style="margin-bottom: 0; line-height: 1.5;">Share photos, videos, and more</li>
        </ul>
      </div>
      
      <div style="text-align: center; margin: 32px 0;">
        <a href=${safeURL} target="_blank" rel="noopener noreferrer" style="background: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%); color: #0d0d0d; text-decoration: none; padding: 14px 32px; border-radius: 6px; font-weight: 600; font-size: 15px; display: inline-block; box-shadow: 0 2px 12px rgba(255,255,255,0.2); transition: all 0.2s;">Open ConvoPoint</a>
      </div>
      
      <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #2d2d2d;">
        <p style="margin-bottom: 8px; color: #b4b4b4; font-size: 14px;">If you need any help or have questions, we're always here to assist you.</p>
        <p style="margin-top: 0; color: #b4b4b4; font-size: 14px;">Happy messaging!</p>
      </div>
      
      <p style="margin-top: 28px; margin-bottom: 0; color: #ececec; font-size: 14px; font-weight: 500;">Best regards,<br><span style="color: #ffffff;">The ConvoPoint Team</span></p>
    </div>
    
    <div style="text-align: center; padding: 24px 20px; color: #6b6b6b; font-size: 13px;">
      <p style="margin-bottom: 12px;">© 2025 ConvoPoint. All rights reserved.</p>
      <p style="margin: 0;">
        <a href="#" style="color: #b4b4b4; text-decoration: none; margin: 0 12px; font-weight: 500;">Privacy Policy</a>
        <a href="#" style="color: #b4b4b4; text-decoration: none; margin: 0 12px; font-weight: 500;">Terms of Service</a>
        <a href="#" style="color: #b4b4b4; text-decoration: none; margin: 0 12px; font-weight: 500;">Contact Us</a>
      </p>
    </div>
  </body>
  </html>
  `;
};
