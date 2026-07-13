import nodemailer from 'nodemailer';
import dns from 'dns';

// Force Node.js to prefer IPv4 DNS resolution globally (fixes Render IPv6 ENETUNREACH errors)
if (typeof dns.setDefaultResultOrder === 'function') {
  dns.setDefaultResultOrder('ipv4first');
}

export async function sendLeadNotification(lead) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  if (!emailUser || !emailPass) {
    console.warn('WARNING: EMAIL_USER and EMAIL_PASS environment variables are not configured on Render. Notification email not sent.');
    console.log('Lead Details:', lead);
    return;
  }

  try {
    // Manually resolve smtp.gmail.com to IPv4 address to bypass Render's broken IPv6 network stack
    const smtpIp = await new Promise((resolve) => {
      dns.resolve4('smtp.gmail.com', (err, addresses) => {
        if (err) {
          console.warn('DNS resolve4 failed for smtp.gmail.com, falling back to host string...', err.message);
          resolve('smtp.gmail.com');
        } else if (!addresses || addresses.length === 0) {
          resolve('smtp.gmail.com');
        } else {
          resolve(addresses[0]);
        }
      });
    });

    console.log('Using resolved SMTP IPv4 Address:', smtpIp);

    const transporter = nodemailer.createTransport({
      host: smtpIp, // Connect directly to IPv4 IP address
      port: 587,
      secure: false, // false for port 587 (STARTTLS)
      requireTLS: true, // Force upgrade to secure TLS
      tls: {
        servername: 'smtp.gmail.com' // Crucial for SSL/TLS certificate validation!
      },
      connectionTimeout: 5000, // 5 seconds connection timeout
      greetingTimeout: 5000,   // 5 seconds greeting timeout
      socketTimeout: 5000,     // 5 seconds socket timeout
      logger: true, // Log connection data to console
      debug: true,  // Include SMTP traffic in logs
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    const mailOptions = {
      from: `"Aparous Notification" <${emailUser}>`,
      to: 'aparous.solutions@gmail.com',
      subject: `New Lead Submitted: ${lead.businessName || lead.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 25px; border: 1px solid #eaeaea; border-radius: 12px; background-color: #fafafa; color: #333;">
          <div style="text-align: center; border-bottom: 2px solid #a14fff; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #6f26d9; margin: 0; font-size: 1.5rem; letter-spacing: 0.5px;">New Project Ascent Initialized</h2>
            <p style="margin: 5px 0 0 0; color: #666; font-size: 0.85rem;">Aparous Lead Qualification System</p>
          </div>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 0.95rem;">
            <tr>
              <td style="padding: 10px 0; font-weight: bold; width: 140px; border-bottom: 1px solid #eee; color: #555;">Lead Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${lead.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Email:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><a href="mailto:${lead.email}" style="color: #00f2fe; text-decoration: none; font-weight: bold;">${lead.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Business Name:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${lead.businessName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #555;">Allocated Budget:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #a14fff; font-weight: bold;">${lead.budget || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; font-weight: bold; border-bottom: 1px solid #eee; color: #555; vertical-align: top;">Project Scope:</td>
              <td style="padding: 10px 0; border-bottom: 1px solid #eee; line-height: 1.6; color: #444;">
                <div style="background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; min-height: 50px;">
                  ${lead.projectDetails || 'No details provided.'}
                </div>
              </td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; border-top: 1px solid #eaeaea; padding-top: 20px; text-align: center; font-size: 0.75rem; color: #999;">
            <p style="margin: 0;">This notification was automatically dispatched by Aparous CRM.</p>
            <p style="margin: 5px 0 0 0;">Render Application Instance: <strong>https://aparous.onrender.com</strong></p>
          </div>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Lead notification email sent successfully:', info.messageId);
  } catch (error) {
    console.error('Error sending lead notification email:', error);
    throw error;
  }
}

export async function sendTelegramNotification(lead) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN || '8836741801:AAFyaSg4679txpxZ69ji9lAwGEJICx0ZzgA';
  const rawChatIds = process.env.TELEGRAM_CHAT_ID || '1385714462,6480716218';

  if (!botToken || !rawChatIds) {
    console.warn('WARNING: Telegram Bot Token or Chat IDs not configured.');
    return;
  }

  const chatIds = rawChatIds.split(',').map(id => id.trim()).filter(Boolean);

  const messageText = `<b>🔔 New Lead Received on Aparous!</b>\n\n` +
    `👤 <b>Name:</b> ${lead.name}\n` +
    `📧 <b>Email:</b> ${lead.email}\n` +
    `🏢 <b>Business/Company:</b> ${lead.company || lead.businessName || 'N/A'}\n` +
    `📞 <b>Phone:</b> ${lead.phone || 'N/A'}\n` +
    `🛠️ <b>Service:</b> ${lead.serviceInterested || 'N/A'}\n` +
    `⏳ <b>Timeline:</b> ${lead.projectTimeline || 'N/A'}\n` +
    `💰 <b>Budget:</b> ${lead.budget || 'N/A'}\n\n` +
    `📝 <b>Project Details:</b>\n<i>${lead.message || lead.projectDetails || 'No details provided.'}</i>`;

  for (const chatId of chatIds) {
    try {
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: 'HTML'
        })
      });
      const result = await response.json();
      if (result.ok) {
        console.log(`Telegram notification sent successfully to ${chatId}!`);
      } else {
        console.error(`Telegram API error for ${chatId}:`, result.description);
      }
    } catch (err) {
      console.error(`Error sending Telegram notification to ${chatId}:`, err);
    }
  }
}
