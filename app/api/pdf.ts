import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/print');
  await page.emulateMediaType('screen');

  const pdfBuffer = await page.pdf({ format: 'A4' });

  res.send(pdfBuffer);

  await browser.close();
}
