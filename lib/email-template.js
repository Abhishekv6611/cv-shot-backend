import juice from 'juice';

export const verificationTokenEmailTemplate = (resetUrl) => {


  const html = `<!DOCTYPE html>
 <html dir="ltr" lang="en">
  <head>
    <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    <meta name="x-apple-disable-message-reformatting" />
    <style>
      :root {
        --primary: #6366f1;
        --primary-hover: #4f46e5;
        --background: #f8fafc;
        --surface: #ffffff;
      }

      body {
        font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background-color: var(--background);
        margin: 0;
        padding: 2rem 0;
        color: #334155;
        line-height: 1.5;
      }

      .container {
        max-width: 600px;
        margin: 0 auto;
        background: var(--surface);
        border-radius: 1.5rem;
        overflow: hidden;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05),
          0 20px 25px -5px rgba(0, 0, 0, 0.1);
      }

      .header {
        background: linear-gradient(135deg, var(--primary) 0%, #4f46e5 100%);
        color: white;
        padding: 1rem;
        /* padding-bottom: .5rem; */
        text-align: center;
        position: relative;
      }

      .header::after {
        content: "";
        position: absolute;
        bottom: -24px;
        left: 0;
        right: 0;
        height: 24px;
        background: var(--surface);
        border-radius: 1.5rem 1.5rem 0 0;
      }

      .header h1 {
        margin: 0;
        font-size: 1.875rem;
        font-weight: 700;
        letter-spacing: -0.025em;
      }

      .content {
        padding: 2.5rem;
      }

      .title {
        font-size: 1.5rem;
        font-weight: 600;
        color: #1e293b;
        margin: 0 0 1.5rem;
      }

      .text {
        color: #64748b;
        margin: 0 0 1.5rem;
      }

      .cta-button {
        display: inline-block;
        background: var(--primary);
        color: white !important;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        text-decoration: none;
        font-weight: 500;
        width: 90%;
        text-align: center;
        transition: background 0.2s ease;
        margin: 1.5rem 0;
      }

      .cta-button:hover {
        background: var(--primary-hover);
      }

      .note {
        background: #fff4f2;
        border-left: 4px solid #dc2626;
        padding: 1rem;
        border-radius: 0.5rem;
        margin: 2rem 0;
        display: flex;
        gap: 0.75rem;
      }

      .note-icon {
        color: #dc2626;
        font-size: 1.25rem;
        flex-shrink: 0;
      }

      .footer {
        padding: 2rem;
        text-align: center;
        background: var(--surface);
        color: #64748b;
        font-size: 12px;
        border-top: 1px solid #e2e8f0;
      }

      @media (max-width: 640px) {
        body {
          padding: 1rem;
        }

        .container {
          border-radius: 1rem;
        }

        .header {
          padding: 2rem 1.5rem;
        }

        .content {
          padding: 1rem;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <!-- Modern Gradient Header -->
      <div class="header">
        <h1>Welcome to CV-shot</h1>
      </div>

      <!-- Main Content -->
      <div class="content">
        <h2 class="title">Password Reset Request</h2>

        <p class="text">
          We received a request to reset your CV-shot account password. Click
          the button below to securely reset your password:
        </p>

        <!-- Primary CTA Button -->
        <a href="${resetUrl}" class="cta-button"> Reset Password Now </a>

        <!-- Security Warning -->
        <div class="note">
          <div class="note-icon">⚠️</div>
          <div>
            <strong>Security note:</strong> This link expires in 10 minutes. If
            you didn't request this password reset, please ignore this email.
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p>
          This message was sent by CV-shot Web Services. CV-shot will never
          ask you to disclose or verify your password, credit card, or banking
          account.
        </p>
        <p>
          © 2025 CV-shot Web Services. All rights reserved ·
          <a
            style="color: var(--primary); text-decoration: none"
            >CV-shot.com</a
          >
        </p>
      </div>
    </div>
  </body>
</html>`


  const inlinedHtml = juice(html);
  return inlinedHtml;
}