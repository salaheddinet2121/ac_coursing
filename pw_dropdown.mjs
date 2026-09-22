import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await page.hover('#prestations-trigger');
await page.waitForTimeout(300);
await page.screenshot({ path: '/tmp/dropdown-open.png' });
await browser.close();
