import { Resend } from 'resend';
import { storeDocumentForDownload } from '../src/lib/documentStore';

// Default configuration provided by Balcad Travel Agency
const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_TWbKz7NS_PznhCCQQABkyELZPWL1ir9rP';

/**
 * Ensures the sender email strictly follows `Name <email@domain.com>` or `email@domain.com`.
 * If the environment variable provides only a name (e.g. "Balcad travelagency"),
 * safely append `<onboarding@resend.dev>` so Resend doesn't throw a validation_error.
 */
function getSenderEmail(): string {
  const envFrom = process.env.RESEND_FROM_EMAIL?.trim();
  if (!envFrom) {
    return 'Balcad Travel <onboarding@resend.dev>';
  }

  // Check if it already has an email in angle brackets
  const bracketMatch = envFrom.match(/<([^>]+)>/);
  if (bracketMatch && bracketMatch[1].includes('@')) {
    return envFrom;
  }

  // Check if it is a bare email address
  if (envFrom.includes('@') && !envFrom.includes(' ')) {
    return `Balcad Travel <${envFrom}>`;
  }

  // If it's a name like "Balcad travelagency", use it as display name with default domain
  const cleanName = envFrom.replace(/[<>]/g, '').trim();
  return `${cleanName || 'Balcad Travel'} <onboarding@resend.dev>`;
}

/**
 * Returns a valid recipient email, falling back to balcadtravel@gmail.com
 */
function getRecipientEmail(): string {
  const envTo = process.env.NOTIFICATION_EMAIL?.trim();
  if (envTo && envTo.includes('@') && envTo.includes('.')) {
    return envTo;
  }
  return 'balcadtravel@gmail.com';
}

/**
 * Validates whether a string is a well-formed email address before passing as replyTo
 */
function isValidEmail(emailStr?: string | null): boolean {
  if (!emailStr || typeof emailStr !== 'string') return false;
  const trimmed = emailStr.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(trimmed);
}

interface RequestPayload {
  type?: 'order' | 'contact' | 'message';
  referenceId?: string;
  serviceType?: string;
  serviceName?: string;
  customerName?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  details?: Record<string, any>;
  order?: any;
  formattedEmailBody?: string;
  appUrl?: string;
}

// Generate luxury gold-and-black branded HTML email for orders & messages
function generateEmailHtml(payload: RequestPayload, reqOrigin?: string): { subject: string; html: string; text: string } {
  const isContact = payload.type === 'contact' || payload.type === 'message';
  const customerName = payload.customerName || payload.order?.customerName || 'Customer';
  const phone = payload.phone || payload.order?.phone || 'Not provided';
  const email = payload.email || payload.order?.email || 'Not provided';
  const referenceId = payload.referenceId || payload.order?.id || `BT-${Math.floor(100000 + Math.random() * 900000)}`;
  const serviceName = payload.serviceName || payload.order?.serviceName || (isContact ? 'General Inquiry' : 'Travel Service');
  const details = payload.details || {};
  const message = payload.message || details.message || '';
  const cleanPhone = phone.replace(/[^0-9]/g, '');

  const docType = details.documentType || payload.order?.documentType;
  const docNumber = details.documentNumber || payload.order?.documentNumber;
  const docExpiry = details.documentExpiry || payload.order?.documentExpiry;
  const docNationality = details.documentNationality || payload.order?.documentNationality;
  const docImageName = details.documentImageName || payload.order?.documentImageName;
  const docImageData = details.documentImageData || payload.order?.documentImageData;

  // Resolve public application URL for tracking and direct document inspection
  const baseUrl = (payload.appUrl || reqOrigin || 'https://ais-pre-t4wvnktijzufha2wd6yteb-375513346653.europe-west2.run.app').replace(/\/$/, '');
  const verifyUrl = `${baseUrl}/?route=check-order&orderId=${encodeURIComponent(referenceId)}&phone=${encodeURIComponent(cleanPhone || phone)}`;
  const directDocDownloadUrl = `${baseUrl}/api/download-document?id=${encodeURIComponent(referenceId)}`;

  const emailSubject = isContact
    ? `📩 New Contact Message from ${customerName}: ${payload.subject || 'Inquiry'}`
    : `✈️ [${referenceId}] New Order: ${serviceName} - ${customerName}`;

  // Build detail rows
  const detailRows: { label: string; value: string }[] = [];

  if (!isContact) {
    if (payload.order?.destinationSummary) {
      detailRows.push({ label: 'Route / Destination', value: String(payload.order.destinationSummary) });
    }
    if (payload.order?.travelDateSummary) {
      detailRows.push({ label: 'Travel Dates', value: String(payload.order.travelDateSummary) });
    }
    for (const [key, val] of Object.entries(details)) {
      if (
        val !== undefined &&
        val !== '' &&
        key !== 'message' &&
        key !== 'subject' &&
        key !== 'documentImageData'
      ) {
        const formattedKey = key
          .replace(/([A-Z])/g, ' $1')
          .replace(/^./, (str) => str.toUpperCase());
        detailRows.push({ label: formattedKey, value: String(val) });
      }
    }
  } else {
    if (payload.subject) {
      detailRows.push({ label: 'Subject', value: String(payload.subject) });
    }
  }

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #0b0b0b;
      color: #e5e5e5;
    }
    .wrapper {
      max-width: 620px;
      margin: 24px auto;
      background: #141414;
      border: 1px solid #D4AF37;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
    }
    .header {
      background: linear-gradient(135deg, #1b160b 0%, #2a200d 100%);
      border-bottom: 2px solid #D4AF37;
      padding: 28px 24px;
      text-align: center;
    }
    .brand-title {
      color: #F9D976;
      font-size: 22px;
      font-weight: 800;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0 0 6px 0;
    }
    .brand-subtitle {
      color: #a3a3a3;
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin: 0;
    }
    .badge {
      display: inline-block;
      margin-top: 14px;
      padding: 6px 14px;
      background: ${isContact ? 'rgba(59, 130, 246, 0.2)' : 'rgba(212, 175, 55, 0.2)'};
      border: 1px solid ${isContact ? '#60a5fa' : '#D4AF37'};
      border-radius: 20px;
      color: ${isContact ? '#93c5fd' : '#F9D976'};
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .body-content {
      padding: 28px 24px;
    }
    .ref-card {
      background: #1c1c1c;
      border: 1px dashed #D4AF37;
      border-radius: 10px;
      padding: 14px 18px;
      margin-bottom: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .ref-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #9ca3af;
      margin-bottom: 2px;
    }
    .ref-value {
      font-size: 18px;
      font-weight: 800;
      color: #F9D976;
      font-family: monospace;
      letter-spacing: 1px;
    }
    .section-title {
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #D4AF37;
      margin: 20px 0 10px 0;
      border-bottom: 1px solid #262626;
      padding-bottom: 6px;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 16px;
    }
    .data-table td {
      padding: 10px 12px;
      font-size: 13px;
      border-bottom: 1px solid #222222;
      vertical-align: top;
    }
    .data-table td.label-col {
      width: 38%;
      color: #9ca3af;
      font-weight: 600;
    }
    .data-table td.val-col {
      color: #ffffff;
      font-weight: 500;
    }
    .message-box {
      background: #181818;
      border-left: 3px solid #D4AF37;
      padding: 16px;
      border-radius: 6px;
      font-size: 13px;
      line-height: 1.6;
      color: #f3f4f6;
      white-space: pre-wrap;
      margin: 12px 0 20px 0;
    }
    .actions-box {
      margin-top: 24px;
      padding: 18px;
      background: #181818;
      border-radius: 10px;
      text-align: center;
    }
    .action-btn {
      display: inline-block;
      padding: 10px 18px;
      margin: 6px 4px;
      border-radius: 8px;
      text-decoration: none;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn-wa {
      background: #059669;
      color: #ffffff !important;
    }
    .btn-call {
      background: #D4AF37;
      color: #0b0b0b !important;
    }
    .btn-email {
      background: #262626;
      color: #ffffff !important;
      border: 1px solid #404040;
    }
    .footer {
      background: #0d0d0d;
      border-top: 1px solid #262626;
      padding: 20px 24px;
      text-align: center;
      font-size: 11px;
      color: #737373;
      line-height: 1.5;
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1 class="brand-title">Balcad Travel Agency</h1>
      <p class="brand-subtitle">Your Journey. Our Support. • Mogadishu, Somalia</p>
      <div class="badge">
        ${isContact ? '📩 Direct Customer Message' : `✈️ Booking Request — ${serviceName}`}
      </div>
    </div>

    <div class="body-content">
      <div class="ref-card">
        <div>
          <div class="ref-label">Reference ID (Active 7 Days)</div>
          <div class="ref-value">${referenceId}</div>
          <div style="font-size: 10px; color: #a3a3a3; margin-top: 3px;">7-Day Retention: Recycled after 7 days</div>
        </div>
        <div style="text-align: right;">
          <div class="ref-label">Received At</div>
          <div style="font-size: 12px; color: #d4d4d4;">${new Date().toLocaleString()}</div>
        </div>
      </div>

      <div class="section-title">Customer Contact Details</div>
      <table class="data-table">
        <tr>
          <td class="label-col">Full Name</td>
          <td class="val-col"><strong>${customerName}</strong></td>
        </tr>
        <tr>
          <td class="label-col">Phone (WhatsApp)</td>
          <td class="val-col"><a href="tel:${cleanPhone}" style="color:#F9D976; text-decoration:none;">${phone}</a></td>
        </tr>
        <tr>
          <td class="label-col">Email Address</td>
          <td class="val-col">${email ? `<a href="mailto:${email}" style="color:#F9D976; text-decoration:none;">${email}</a>` : 'Not provided'}</td>
        </tr>
      </table>

      ${
        detailRows.length > 0
          ? `
      <div class="section-title">Service & Travel Specification</div>
      <table class="data-table">
        ${detailRows
          .map(
            (r) => `
        <tr>
          <td class="label-col">${r.label}</td>
          <td class="val-col">${r.value}</td>
        </tr>`
          )
          .join('')}
      </table>`
          : ''
      }

      ${
        docType || docNumber || docImageData
          ? `
      <div class="section-title" style="color: #F9D976; border-bottom: 1px solid #D4AF37;">Attached Travel Passport & Identity Verification</div>
      <table class="data-table" style="background: #181818; border: 1px solid #333; border-radius: 8px; margin-bottom: 16px;">
        <tr><td class="label-col" style="padding:10px 14px;">Document Type</td><td class="val-col" style="color:#FFF; padding:10px 14px;"><strong>${docType || 'Passport'}</strong></td></tr>
        ${docNumber ? `<tr><td class="label-col" style="padding:10px 14px;">Passport Number</td><td class="val-col" style="color:#F9D976; font-family:monospace; font-size:14px; padding:10px 14px;"><strong>${docNumber}</strong></td></tr>` : ''}
        ${docNationality ? `<tr><td class="label-col" style="padding:10px 14px;">Passport Country / Nationality</td><td class="val-col" style="padding:10px 14px;">${docNationality}</td></tr>` : ''}
        ${docExpiry ? `<tr><td class="label-col" style="padding:10px 14px;">Passport Expiry Date</td><td class="val-col" style="padding:10px 14px;">${docExpiry}</td></tr>` : ''}
        ${docImageName ? `<tr><td class="label-col" style="padding:10px 14px;">Passport File</td><td class="val-col" style="padding:10px 14px; color:#A7F3D0;">📎 ${docImageName}</td></tr>` : ''}
        <tr>
          <td class="label-col" style="padding:10px 14px;">Direct File Download</td>
          <td class="val-col" style="padding:10px 14px;">
            <a href="${directDocDownloadUrl}" style="display:inline-block; background:#D4AF37; color:#0A0A0A; padding:6px 14px; border-radius:6px; font-weight:700; text-decoration:none; font-size:12px; margin-right:8px;">
              📥 Dagsa Baasaboorka (Download Photo)
            </a>
            <a href="${verifyUrl}" style="display:inline-block; background:#222; color:#F9D976; border:1px solid #D4AF37; padding:6px 12px; border-radius:6px; font-weight:600; text-decoration:none; font-size:12px;">
              🔍 Fiiri / Fur Portal-ka
            </a>
          </td>
        </tr>
      </table>
      ${
        docImageData && docImageData.startsWith('data:image/')
          ? `
      <div style="margin: 14px 0 20px 0; padding: 14px; background: #121212; border: 1px solid #444; border-radius: 8px; text-align: center;">
        <div style="font-size: 11px; text-transform: uppercase; color: #D4AF37; margin-bottom: 8px; font-weight: 700;">Passport Photo Preview (Sawirka Baasaboorka)</div>
        <img src="${docImageData}" alt="Uploaded Travel Passport" style="max-width: 100%; max-height: 420px; border-radius: 6px; border: 1px solid #282828; display: inline-block; margin-bottom: 12px;" />
        <div style="margin-top: 8px;">
          <a href="${directDocDownloadUrl}" style="display:inline-block; background: #059669; color: #ffffff; text-decoration: none; padding: 8px 18px; border-radius: 6px; font-weight: bold; font-size: 12px; letter-spacing: 0.5px;">
            📥 RIIX HALKAN SI AAD U DAGSATO SAWIRKA BAASABOORKA
          </a>
        </div>
      </div>`
          : ''
      }`
          : ''
      }

      ${
        message
          ? `
      <div class="section-title">${isContact ? 'Customer Inquiry / Message' : 'Special Notes & Requests'}</div>
      <div class="message-box">${message}</div>`
          : ''
      }

      <div class="actions-box">
        <div style="font-size: 11px; text-transform: uppercase; color: #a3a3a3; margin-bottom: 10px; font-weight: 600;">
          Quick Agent Actions
        </div>
        ${
          cleanPhone
            ? `
        <a href="https://wa.me/${cleanPhone}" class="action-btn btn-wa" target="_blank">
          Message on WhatsApp
        </a>
        <a href="tel:${cleanPhone}" class="action-btn btn-call">
          Call Customer
        </a>`
            : ''
        }
        ${
          email
            ? `
        <a href="mailto:${email}?subject=Regarding%20Balcad%20Travel%20Request%20${referenceId}" class="action-btn btn-email">
          Reply by Email
        </a>`
            : ''
        }
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0 0 6px 0;">
        This notification was automatically dispatched from the <strong>Balcad Travel Agency</strong> customer portal to <a href="mailto:${getRecipientEmail()}">${getRecipientEmail()}</a>.
      </p>
      <p style="margin: 0;">
        Agency Hotline: 612483838 / 612141414 • Head Office, Mogadishu, Somalia
      </p>
    </div>
  </div>
</body>
</html>
`;

  // Plain text fallback
  const textLines: string[] = [
    '==================================================',
    `BALCAD TRAVEL AGENCY - ${isContact ? 'CUSTOMER INQUIRY' : 'SERVICE REQUEST'}`,
    '==================================================',
    `Reference ID: ${referenceId}`,
    `Subject/Type: ${serviceName}`,
    `Date/Time:    ${new Date().toLocaleString()}`,
    '',
    'CUSTOMER DETAILS:',
    `Name:         ${customerName}`,
    `Phone:        ${phone}`,
    `Email:        ${email}`,
    '',
  ];

  if (detailRows.length > 0) {
    textLines.push('TRAVEL / SERVICE DETAILS:');
    detailRows.forEach((r) => {
      textLines.push(`${r.label.padEnd(16)}: ${r.value}`);
    });
    textLines.push('');
  }

  if (docType || docNumber || docImageData) {
    textLines.push('TRAVEL PASSPORT & VERIFICATION INFO:');
    textLines.push(`Type:           ${docType || 'Passport'}`);
    if (docNumber) textLines.push(`Passport No:    ${docNumber}`);
    if (docNationality) textLines.push(`Nationality:    ${docNationality}`);
    if (docExpiry) textLines.push(`Expiry Date:    ${docExpiry}`);
    if (docImageName) textLines.push(`File Name:      ${docImageName}`);
    textLines.push(`Download Link:  ${directDocDownloadUrl}`);
    textLines.push(`Portal Lookup:  ${verifyUrl}`);
    textLines.push('');
  }

  if (message) {
    textLines.push('MESSAGE / NOTES:');
    textLines.push(message);
    textLines.push('');
  }

  textLines.push('==================================================');
  textLines.push(`Dispatched To: ${getRecipientEmail()}`);
  textLines.push('Hotline: 612483838 / 612141414');
  textLines.push('==================================================');

  return {
    subject: emailSubject,
    html,
    text: textLines.join('\n'),
  };
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
};

/**
 * Main handler compatible with both Vercel Serverless Functions and Express.js
 */
export default async function handler(req: any, res: any) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Health check or GET
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      service: 'Balcad Travel Resend Email Service',
      sender: getSenderEmail(),
      recipient: getRecipientEmail(),
      configured: Boolean(RESEND_API_KEY),
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const payload: RequestPayload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {};

    // Store document in memory so agency staff can download it via link
    const refId = payload.referenceId || payload.order?.id;
    const docData = payload.details?.documentImageData || payload.order?.documentImageData;
    const docName = payload.details?.documentImageName || payload.order?.documentImageName || 'travel_document.jpg';

    if (refId && docData && typeof docData === 'string' && docData.startsWith('data:')) {
      const match = docData.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        storeDocumentForDownload({
          referenceId: refId,
          fileName: docName,
          mimeType: match[1] || 'image/jpeg',
          dataBase64: match[2],
          uploadedAt: new Date().toISOString(),
        });
      }
    }

    // Determine host / origin for dynamic links
    const protocol = req.headers?.['x-forwarded-proto'] || 'https';
    const host = req.headers?.host || req.headers?.['x-forwarded-host'];
    const origin = host ? `${protocol}://${host}` : undefined;

    // Generate formatted emails
    const { subject, html, text } = generateEmailHtml(payload, origin);

    // Initialize Resend client
    const resend = new Resend(RESEND_API_KEY);

    const sender = getSenderEmail();
    const recipient = getRecipientEmail();
    const candidateEmail = payload.email || payload.order?.email;
    const validReplyTo = isValidEmail(candidateEmail) ? candidateEmail!.trim() : undefined;

    // Prepare email parameters strictly conforming to Resend API validation rules
    const emailParams: any = {
      from: sender,
      to: [recipient],
      subject: subject || 'Balcad Travel Request Notification',
      html,
      text,
    };

    if (validReplyTo) {
      emailParams.replyTo = validReplyTo;
    }

    // Attach document photo directly to email if available
    if (docData && typeof docData === 'string' && docData.startsWith('data:')) {
      const match = docData.match(/^data:([^;]+);base64,(.+)$/);
      if (match) {
        emailParams.attachments = [
          {
            filename: docName,
            content: match[2],
          },
        ];
      }
    }

    // Dispatch email via Resend
    const resendResponse = await resend.emails.send(emailParams);

    if (resendResponse.error) {
      console.error('[Resend Error]', resendResponse.error);
      return res.status(200).json({
        success: false,
        warning: 'Resend API rejected message',
        error: resendResponse.error.message || 'Unknown Resend Error',
        resendError: resendResponse.error,
        recipient,
        referenceId: payload.referenceId || payload.order?.id,
      });
    }

    console.log('[Resend Success] Email sent ID:', resendResponse.data?.id);
    return res.status(200).json({
      success: true,
      id: resendResponse.data?.id,
      recipient,
      referenceId: payload.referenceId || payload.order?.id,
      subject,
      message: `Email dispatched successfully to ${recipient}`,
    });
  } catch (error: any) {
    console.error('[Email Dispatch Exception]', error);
    return res.status(500).json({
      success: false,
      error: error?.message || 'Internal server error while sending email',
      recipient: getRecipientEmail(),
    });
  }
}
