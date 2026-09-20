import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import sendEmailHandler from './api/send-email';
import { getDocumentForDownload } from './src/lib/documentStore';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Parse JSON and urlencoded bodies with 50mb limit to comfortably handle document image uploads
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // API routes FIRST
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Balcad Travel Agency Full-Stack API',
      resendConfigured: true,
      recipient: 'balcadtravel@gmail.com',
    });
  });

  // Direct download link for document photos in customer request emails
  app.get('/api/download-document', (req, res) => {
    const orderId = (req.query.id as string || '').trim().toUpperCase();
    if (!orderId) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html>
        <head><title>Invalid Request - Balcad Travel</title></head>
        <body style="font-family:sans-serif; background:#121212; color:#fff; text-align:center; padding:60px 20px;">
          <h2 style="color:#D4AF37;">Reference ID Required</h2>
          <p style="color:#a3a3a3;">Please provide an order or request reference ID to download the document.</p>
          <a href="/" style="display:inline-block; margin-top:20px; color:#D4AF37; text-decoration:none; border:1px solid #D4AF37; padding:10px 20px; border-radius:8px;">Go to Balcad Travel Home</a>
        </body>
        </html>
      `);
    }

    const doc = getDocumentForDownload(orderId);
    if (!doc || !doc.dataBase64) {
      // If server was restarted or document expired from memory, redirect with helpful prompt to check order
      return res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>Document Lookup - Balcad Travel</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="font-family:sans-serif; background:#0e0e0e; color:#eee; display:flex; align-items:center; justify-content:center; min-height:100vh; margin:0; padding:20px;">
          <div style="max-width:500px; width:100%; background:#1a1a1a; border:1px solid #333; border-radius:16px; padding:32px; text-align:center; box-shadow:0 10px 30px rgba(0,0,0,0.5);">
            <div style="font-size:36px; margin-bottom:12px;">📄</div>
            <h2 style="color:#D4AF37; margin:0 0 10px 0; font-size:22px;">Balcad Travel Document Retrieval</h2>
            <p style="color:#a3a3a3; font-size:14px; line-height:1.6; margin:0 0 24px 0;">
              Document for Reference <strong>${orderId}</strong> is registered. If the direct cache has cycled, you can view and download the full document directly inside the Customer Orders & Verification Portal.
            </p>
            <a href="/?route=check-order&orderId=${encodeURIComponent(orderId)}" style="display:block; background:#D4AF37; color:#0b0b0b; padding:12px 24px; border-radius:8px; font-weight:700; text-decoration:none; font-size:14px; text-transform:uppercase; letter-spacing:0.5px;">
              Open Order in Portal to View & Download
            </a>
            <div style="margin-top:16px;">
              <a href="/" style="color:#737373; font-size:12px; text-decoration:none;">Back to Main Website</a>
            </div>
          </div>
        </body>
        </html>
      `);
    }

    try {
      const buffer = Buffer.from(doc.dataBase64, 'base64');
      const filename = doc.fileName || `${orderId}_document.jpg`;
      const isDownload = req.query.download === 'true' || req.query.download === '1' || true;

      res.setHeader('Content-Type', doc.mimeType || 'image/jpeg');
      res.setHeader('Content-Length', buffer.length.toString());
      if (isDownload) {
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
      } else {
        res.setHeader('Content-Disposition', `inline; filename="${filename}"`);
      }
      return res.send(buffer);
    } catch (err) {
      return res.status(500).send('Failed to serve document image.');
    }
  });

  // Resend Email dispatcher for orders & messages
  app.all('/api/send-email', sendEmailHandler);
  app.all('/api/customer-requests', sendEmailHandler);

  // Vite middleware for development vs static dist for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Balcad Travel Server running on http://localhost:${PORT}`);
  });
}

startServer();
