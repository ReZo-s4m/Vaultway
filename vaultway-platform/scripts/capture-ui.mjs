import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const projectRoot = process.cwd();

const profileDirectory = path.join(
  projectRoot,
  ".playwright-profile"
);

const outputDirectory = path.join(
  projectRoot,
  "captures"
);

await mkdir(outputDirectory, {
  recursive: true,
});

/*
 * This opens a dedicated local browser profile.
 * You will log in manually inside the browser window.
 *
 * No email, password, cookie, or access token is stored
 * directly inside this source file.
 */
const context = await chromium.launchPersistentContext(
  profileDirectory,
  {
    headless: false,
    viewport: {
      width: 1440,
      height: 1000,
    },
  }
);

const pages = context.pages();
const page = pages[0] ?? (await context.newPage());

await page.goto("https://mega.nz/login", {
  waitUntil: "domcontentloaded",
});

console.log("");
console.log("1. Log in manually in the opened browser.");
console.log("2. Open the logged-in page you want to capture.");
console.log("3. Return to this terminal and press Enter.");
console.log("");

await new Promise((resolve) => {
  process.stdin.once("data", resolve);
});

/*
 * Capture the page that is currently open.
 * This avoids hard-coding private account URLs.
 */
await page.waitForTimeout(2000);

const screenshotPath = path.join(
  outputDirectory,
  `mega-dashboard-${Date.now()}.png`
);

await page.screenshot({
  path: screenshotPath,
  fullPage: true,
});

console.log(`Screenshot saved to: ${screenshotPath}`);

/*
 * Keep the browser open until you press Enter again.
 */
console.log("Press Enter to close the browser.");

await new Promise((resolve) => {
  process.stdin.once("data", resolve);
});

await context.close();