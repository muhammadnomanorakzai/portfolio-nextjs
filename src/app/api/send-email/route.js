import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const notificationEmail =
      process.env.CONTACT_NOTIFICATION_EMAIL || "your.email@example.com";
    const fromEmail =
      process.env.NOTIFICATION_FROM_EMAIL || "onboarding@resend.dev";

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: notificationEmail,
      subject: `New Contact Form Submission: ${subject || "No Subject"}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: #f9fafb;
                border-radius: 8px;
                padding: 24px;
                margin-top: 20px;
              }
              .header {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
                border-radius: 8px 8px 0 0;
                margin: -24px -24px 20px -24px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .field {
                margin-bottom: 16px;
              }
              .label {
                font-weight: 600;
                color: #6b7280;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.05em;
              }
              .value {
                background: white;
                padding: 12px;
                border-radius: 6px;
                margin-top: 4px;
              }
              .message {
                background: white;
                padding: 16px;
                border-radius: 6px;
                margin-top: 4px;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 24px;
                padding-top: 16px;
                border-top: 1px solid #e5e7eb;
                font-size: 12px;
                color: #9ca3af;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 New Contact Form Submission</h1>
              </div>
              
              <div class="field">
                <div class="label">From</div>
                <div class="value">
                  <strong>${name}</strong>
                  <br>
                  <a href="mailto:${email}" style="color: #667eea;">${email}</a>
                </div>
              </div>
              
              ${subject ? `
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${subject}</div>
              </div>
              ` : ""}
              
              <div class="field">
                <div class="label">Message</div>
                <div class="message">${message}</div>
              </div>
              
              <div class="footer">
                <p>Received: ${new Date().toLocaleString()}</p>
                <p>This message was sent from your portfolio contact form.</p>
              </div>
            </div>
          </body>
        </html>
      `,
      text: `
New Contact Form Submission
===========================

From: ${name} (${email})
${subject ? `Subject: ${subject}` : ""}

Message:
${message}

---
Received: ${new Date().toLocaleString()}
This message was sent from your portfolio contact form.
      `.trim(),
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email notification" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email notification sent successfully",
      emailId: data?.id,
    });
  } catch (error) {
    console.error("Error in send-email API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
