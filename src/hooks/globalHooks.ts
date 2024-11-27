import { Before, After, setWorldConstructor, setDefaultTimeout, Status } from "@cucumber/cucumber";
import path from "path";
import { Browser, BrowserContext, chromium, firefox, Page, webkit } from "playwright";
import fs from "fs";
import { initElements } from "../../globalSetup";

const BROWSER_TYPE: string = "chrome";
const HEADLESS_MODE: boolean = false;
const MAXIMIZED_WINDOW: boolean = true;
const SLOW_MOTION_DELAY: number = 0;
const DEFAULT_TIMEOUT: number = 30000;

Before(async function (this: CustomWorld) {
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    await takeScreenshot(this.page, scenario.pickle.name);
  }
  await this.close();
});

async function takeScreenshot(page: Page | undefined, scenarioName: string): Promise<void> {
  if (!page) {
    console.warn("Page object not available, skipping screenshot");
    return;
  }

  const screenshotsDir: string = path.join(process.cwd(), "reports", "screenshots");
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const currentDateTime: string = new Date().toISOString().replace(/[:T.]/g, "_").slice(0, -5);
  const fileName: string = `${scenarioName.replace(/\s+/g, "_")}_${currentDateTime}.png`;
  const filePath: string = path.join(screenshotsDir, fileName);

  await page.screenshot({ path: filePath, fullPage: true });
}

export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  async initializeBrowser(): Promise<Browser> {
    const launchOptions = {
      headless: HEADLESS_MODE,
      slowMo: SLOW_MOTION_DELAY,
      args: MAXIMIZED_WINDOW && BROWSER_TYPE.toLowerCase() === "chrome" ? ["--start-maximized"] : [],
    };

    const browserType: string = BROWSER_TYPE.toLowerCase();
    return await (browserType === "firefox" ? firefox : browserType === "webkit" || browserType === "safari" ? webkit : chromium).launch(launchOptions);
  }

  async init(): Promise<void> {
    this.browser = await this.initializeBrowser();
    this.context = await this.browser.newContext(MAXIMIZED_WINDOW ? { viewport: null } : {});
    this.page = await this.context.newPage();

    if (MAXIMIZED_WINDOW) {
      await this.page.setViewportSize(await this.page.evaluate(() => ({
        width: window.screen.availWidth,
        height: window.screen.availHeight,
      })));
    }

    initElements(this.page);
  }

  async close(): Promise<void> {
    await Promise.all([
      this.page?.close().catch(err => console.warn('Error closing page:', err)),
      this.browser?.close().catch((err: any) => console.warn('Error closing browser:', err))
    ]);
  }
}

setWorldConstructor(CustomWorld);

setDefaultTimeout(DEFAULT_TIMEOUT);