import { expect } from '@playwright/test';
import { Page } from 'playwright';
import * as dotenv from 'dotenv';
dotenv.config();

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  
  async login(): Promise<void> {
    const code = Buffer.from(`${process.env.USERNAME}:${process.env.PASSWORD}`).toString("base64");
    await this.page.setExtraHTTPHeaders({Authorization: `Basic ${code}`});
    await this.page.goto(process.env.URL as string);
    await this.page.waitForTimeout(600);
  }
}