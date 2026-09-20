export default async function handler(req: any, res: any) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  return res.status(200).json({
    status: 'ok',
    service: 'Balcad Travel Agency Full-Stack API (Vercel Serverless Ready)',
    resendConfigured: Boolean(process.env.RESEND_API_KEY || 're_TWbKz7NS_PznhCCQQABkyELZPWL1ir9rP'),
    recipient: process.env.NOTIFICATION_EMAIL || 'balcadtravel@gmail.com',
    timestamp: new Date().toISOString(),
  });
}
